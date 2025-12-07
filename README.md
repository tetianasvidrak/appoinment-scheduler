# Scheduler App - Frontend

A modern single-page appointment scheduling application designed for beauty salons, and service-based businesses.
This is the **frontend** part of the project (built with React, Vite and TypeScript).
The main goal of this system is to help businesses manage clients, services, and visit scheduling through a simple and powerful UI.

## ✨ Features

### 📅 Calendar & Scheduling

- Daily calendar view with time-slot grid
- Create, edit, delete visits
- Drag & drop visits between time slots (powered by **dnd-kit**)
- Automatically detects overlapping times
- Navigate between dates
- Localized with **Dayjs** (EU format, week starts on Monday)

### 🛎 Services Management

- Create, edit and delete services
- Supports duration, price and category
- Smart validation (name + category uniqueness)

### 👥 Clients Management

- Add, edit, delete clients

### 🏷 Categories & Employees

- Category and employee list loaded from backend

### ⚡ Technology Stack

- **React + Vite**
- **TypeScript**
- **Material UI (MUI)** - components
- **TailwindCSS** - layout and styling
- **RTK Query** - data fetching & caching
- **Dayjs** - date/time handling
- **dnd-kit** - drag & drop
- **React Router**

## ⚙️ Installation & Running Locally

1. Clone the repository

   ```
   git clone https://github.com/tetianasvidrak/appointment-scheduler.git .
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Add environment variables for backend integration

   - Visit backend repository and follow steps from README before proceed with frontend:
     `https://github.com/tetianasvidrak/appoinment-scheduler-be`

   - Create .env file:

     ```
     VITE_API_URL=http://localhost:5000/api
     ```

4. Start development server
   ```
   npm run dev
   ```

The app will be available at: `http://localhost:5173`.

## 🚀 Upcoming Features

- User authentication

- Multi-location support

- SMS/Email reminders

- Dark mode

- Mobile responsive layout

- Dashboard statistics
