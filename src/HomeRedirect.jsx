import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const HomeRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

export default HomeRedirect;
