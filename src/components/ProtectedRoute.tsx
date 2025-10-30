import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const location = useLocation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      toast.error("Authentication Required", {
        description: "Please login to access this page.",
      });
      hasShownToast.current = true;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Save the path the user tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
