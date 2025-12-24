// src/hooks/useUsers.ts
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import type { User } from '../services/userService';
// Define the shape of the form data
interface UserFormData {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export function useUsers() {
  // --- Data State ---
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Form State ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    id: '',
    name: '',
    email: '',
    role: 'atendente', // Default value
    is_active: true
  });

  // --- Lifecycle ---
  useEffect(() => {
    loadUsers();
  }, []);

  // --- Actions ---

  // Fetch users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      const userList = Array.isArray(response) ? response : (response.data || []);
      setUsers(userList);
    } catch (err) {
      setError('Failed to load users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Prepare form for editing
  const handleEdit = (user: User) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: Boolean(user.is_active)
    });
    setIsEditing(true);
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({ id: '', name: '', email: '', role: 'atendente', is_active: true });
    setIsEditing(false);
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update User
        await userService.update(formData.id, {
          name: formData.name,
          role: formData.role,
          is_active: formData.is_active
        });
        alert('User updated successfully!');
      } else {
        // Create User
        await userService.create({
          name: formData.name,
          email: formData.email,
          role: formData.role
        });
        alert('User created! Temporary password sent to server logs.');
      }
      resetForm();
      loadUsers();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Error saving user.';
      alert(msg);
    }
  };

  // Delete/Deactivate User
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;
    try {
      await userService.delete(id);
      loadUsers();
    } catch (err) {
      alert('Error deactivating user.');
    }
  };

  // Expose everything the View needs
  return {
    users,
    loading,
    error,
    formData,
    setFormData,
    isEditing,
    handleEdit,
    handleDelete,
    handleSubmit,
    resetForm
  };
}