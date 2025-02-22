import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './pages/Auth/Login/Login.jsx';
import Register from './pages/Auth/Register/Register.jsx';
import Dashboard from './pages/Auth/Dashboard/Dashboard.jsx';
import { AuthProvider } from './AuthProvider.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import HomeRedirect from './HomeRedirect.jsx';
import Tasks from './pages/Auth/Dashboard/Tasks.jsx';
import CompletedTask from './pages/Auth/Dashboard/CompletedTask.jsx';
import ImportantTask from './pages/Auth/Dashboard/ImportantTask.jsx';
import Profile from './pages/Auth/Dashboard/Profile.jsx';
import Overview from './pages/Auth/Dashboard/Overview.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRedirect />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    children: [
      {
        index: true, // This makes "Tasks" the default when visiting /dashboard
        element: <ProtectedRoute><Tasks /></ProtectedRoute>
      },
      {
        path: "tasks",
        element: <ProtectedRoute><Tasks /></ProtectedRoute>
      },
      {
        path: "completed-tasks",
        element: <ProtectedRoute><CompletedTask /></ProtectedRoute>
      },
      {
        path: "important-tasks",
        element: <ProtectedRoute><ImportantTask /></ProtectedRoute>
      },
      {
        path: "overview",
        element: <ProtectedRoute><Overview /></ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
