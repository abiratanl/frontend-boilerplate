# Guia de Contribuição - Frontend Boilerplate

Thank you for your interest in contributing to the **Frontend Boilerplate**! 🎉

This document contains guidelines to ensure that development is consistent and smooth for all team members, regardless of the operating system they are using (Windows, Linux, or macOS).

## 🚀 Starting

### Pré-requisitos

Make sure you have the following installed on your machine:

- **Node.js** (LTS version recommended - v20 or higher)
- **Git**

### 💻 Configuration for Windows Users

This project has been configured to be **Windows-Proof**. This means that:

1. Line breaks (CRLF vs LF) are automatically managed by the `.gitattributes` file.
2. Test and build scripts use `cross-env` to ensure environment variable compatibility.
3. We do not use Unix-exclusive commands (such as `rm -rf`) in the `package.json` scripts.

**Tip:** If you encounter permission errors when running scripts in PowerShell, run PowerShell as Administrator and run:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Installation

Clone the repository:

`Bash`

```
git clone https://github.com/abiratanl/frontend-boilerplate

cd frontend-boilerplate
```

Install the dependencies:

`Bash`

```
npm install
```

Start the development server:

`Bash`

```
npm run dev
```

## The project will be running at http://localhost:5173.

<br>
## 🧪 Tests ##

We use Vitest and React Testing Library. Thanks to the configuration of `src/setupTests.ts` and `cross-env`, the tests run natively in any terminal.

To run the tests:

`Bash`

```
npm run test
```

Para rodar os testes com interface visual (UI):

`Bash`

```
npm run test:ui
```

**Writing Tests**

Test files should be located next to the component, with the extension `.test.tsx` (e.g., `Login.test.tsx`).

When testing asynchronous interactions (such as "Loading..."), prefer using screen.getByText or screen.findByText with flexible Regex to avoid breakage due to small text changes.

## 🛠 Code Patterns and Git

**Branches**

Use the simplified git-flow pattern:

- `main`: Production code.

- `dev`: Main development branch.

- `feat/feature-name`: For new features.

- `fix/fix-name`: For bug fixes.

**Commits**

Follow the **Conventional Commits** convention to keep your history clean. Examples:

- `feat: Adds button component`
- `fix: Fixes login validation error.`
- `test: Updates registration page tests.`
- `style: format code with prettier`

<br>
**Linting and Formatting**

The project already has ESLint configured. Before uploading your code, make sure there are no errors:

`Bash`

```
npm run lint
```

## 📦 Pull Request (PR) Process

1. Push your branch (git push origin feat/your-feature).

Open a Pull Request pointing to the dev branch (or main, depending on urgency/workflow).

Clearly describe what was done in the PR.

Await code review.

After approval, the merge will be performed.

## 📝 Scripts Disponíveis

<table>

<thead>

<tr>

<th>Command</th>

<th>Description</th>

</tr>

</thead>

<tbody>

<tr>
<td>npm run dev</td>

<td>Starts the local development server.</td>

</tr>

<tr>

<td>npm run build</td>

<td>Compiles the project for production (dist folder).</td>

</tr>

<tr>
<td>npm run test</td>

<td>Runs the unit test suite.</td>

</tr>

<tr>
<td>npm run lint</td>

<td>Checks for code problems with ESLint.</td>

</tr>

</tbody>
</table>


Thank you for contributing!🚀

---
