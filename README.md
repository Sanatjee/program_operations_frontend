# Program Operations Dashboard - Frontend

## Overview

The Program Operations Dashboard Frontend is built using **React.js** and provides a responsive user interface for managing programs, users, learner registrations, payments, and dashboard statistics.

The application communicates with the Laravel backend using REST APIs secured with Bearer Token Authentication.

---

## Tech Stack

- React.js
- React Router DOM
- Axios
- Bootstrap 5
- Boxicons
- Context API

---

## Features

- User Authentication
- Dashboard
- Program Management
- User Management
- Learner Registration
- Payment Management
- Role Based Access Control
- Permission Based UI Rendering
- Search
- Filters
- Pagination
- Form Validation
- Toast Notifications
- Confirmation Dialogs

---

## Roles

- Admin
- Program Manager
- Operations User

---

## Prerequisites

Before running the project, ensure you have:

- Node.js (v18 or above)
- npm (v9 or above)
- Backend application running

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Navigate to the project

```bash
cd program_operations_frontend
```

### Install dependencies

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the project root.

```env
VITE_API_URL=http://program_operations_dashboard.test/api
```

Update the URL according to your backend environment.

---

## Run the application

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Production Build

Build the project:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
src
│
├── components
│   ├── DeleteModal.jsx
│   ├── PaymentModal.jsx
│   ├── Permission.jsx
│   ├── RegistrationModal.jsx
│   ├── Toast.jsx
│   └── UserModal.jsx
│
├── context
│
├── layouts
│
├── pages
│   ├── Dashboard
│   ├── Programs
│   ├── Registrations
│   └── Users
│
├── routes
│
├── services
│   ├── api
│   ├── authService.js
│   ├── paymentService.js
│   ├── programService.js
│   ├── registrationService.js
│   └── userService.js
│
├── utils
│
├── App.jsx
└── main.jsx
```

---

## Modules

### Dashboard

- Dashboard statistics
- Program overview
- Registration overview
- Payment overview

### Programs

- Create Program
- Update Program
- Delete Program
- Search Programs
- Pagination

### Users

- Create User
- Update User
- Delete User
- Activate/Deactivate User
- Search Users
- Filter by Role
- Filter by Status

### Registrations

- Register Learner
- Update Registration
- Delete Registration
- Search Learners
- Filter by Payment Status

### Payments

- Record Payments
- Payment Validation
- Prevent Overpayment

---

## Authentication

The application authenticates users using a Bearer Token.

After successful login, the token is stored in Local Storage and automatically attached to every API request using Axios interceptors.

---

## Permission Based UI

Navigation menus, buttons, and actions are rendered based on the authenticated user's permissions.

Examples include:

- `dashboard.view`
- `program.view`
- `program.create`
- `program.edit`
- `program.delete`
- `registration.view`
- `registration.create`
- `registration.edit`
- `registration.delete`
- `payment.view`
- `payment.create`
- `user.view`
- `user.create`
- `user.edit`
- `user.delete`

---

## Available Scripts

Start development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## Backend Repository

Ensure the backend application is running before starting the frontend.

Default backend URL (configured in `.env`):

```
http://program_operations_dashboard.test/api
```

---

## License

This project is developed as part of the **Program Operations Dashboard** assignment.