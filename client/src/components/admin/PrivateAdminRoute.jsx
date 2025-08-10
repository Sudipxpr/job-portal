import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "Recruiter") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateAdminRoute;
