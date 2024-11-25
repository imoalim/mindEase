import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/services/AuthProvider";

const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/authenticate" />;
};
export default PrivateRoutes;