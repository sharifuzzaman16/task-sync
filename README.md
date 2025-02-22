Here's a README file for your **Task Management Application** based on the provided details:  

---

# Task Sync

A **Task Management Application** where users can add, edit, delete, and reorder tasks using a **drag-and-drop interface**. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. The app ensures real-time synchronization with a database for persistent task management.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [API & Database](#api--database)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

✅ Drag-and-drop task management  
✅ Real-time updates with Firebase & MongoDB  
✅ Clean, minimalistic UI with TailwindCSS  
✅ Responsive design for desktop & mobile  
✅ Instant database synchronization  
✅ Secure authentication using JWT  

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download) (Recommended: v18+)
- [MongoDB](https://www.mongodb.com/) (For backend storage)
- [Firebase](https://firebase.google.com/) (For real-time data sync)

### Steps to Install

#### 1️⃣ Clone the repository:
```bash
git clone https://github.com/sharifuzzaman16/task-sync
cd task-sync
```

#### 2️⃣ Install dependencies:

For the frontend:
```bash
cd client
npm install
```

For the backend:
```bash
cd server
npm install
```

#### 3️⃣ Set up environment variables:

- In the **client** directory, create a `.env` file and add:

```ini
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket_name
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

- In the **server** directory, create a `.env` file and add:

```ini
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
```

#### 4️⃣ Start the application:

For the frontend:
```bash
npm run dev
```

For the backend:
```bash
node index.js
```

## Usage

1. Open the app in your browser.
2. Add tasks in the **To-Do** column.
3. Drag tasks to **In Progress** or **Done** as needed.
4. Tasks will be **automatically saved** and synchronized across devices.

## Technologies Used

### Frontend:
- **React 19** (UI Framework)
- **Vite** (Build Tool)
- **TailwindCSS** & **DaisyUI** (Styling)
- **React Query** (State Management)
- **Firebase** (Real-time Sync)
- **@hello-pangea/dnd** (Drag & Drop)

### Backend:
- **Node.js & Express.js** (Server)
- **MongoDB** (Database)
- **JWT** (Authentication)
- **WebSockets** (Real-time Communication)
- **CORS** (Cross-Origin Requests)

## API & Database

The backend uses **MongoDB** for data storage, with Express.js handling API routes. The following endpoints are available:

| Method | Endpoint         | Description                     |
|--------|-----------------|---------------------------------|
| GET    | `/tasks`        | Fetch all tasks                |
| POST   | `/tasks`        | Add a new task                 |
| PUT    | `/tasks/:id`    | Update task details            |
| DELETE | `/tasks/:id`    | Remove a task                  |

## Troubleshooting

- **Firebase API key error?**  
  - Ensure `.env` is properly configured.
- **MongoDB connection issues?**  
  - Verify `DB_USER` and `DB_PASS` in the backend `.env` file.
- **CORS issues?**  
  - Modify CORS settings in `server/index.js`.
