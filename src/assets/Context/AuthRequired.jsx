import { Outlet, Navigate, useLocation } from "react-router";

import { useAuth } from "./AuthContext";

export default function AuthRequired() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const authenticated = user ? true : false;
  if (loading) return <p>Loading...</p>;

  if (!authenticated) {
    return <Navigate to="/loginpage" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
