import { Navigate } from "react-router-dom";

/**
 * Protected route for authenticated user.
 *
 * @category routes
 * @returns route middleware
 */
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {

  /**
   * take user token from localstorage
   *
   * Warning : Security alarm
   * @category core
   * @returns user auth token
   */
  const token = localStorage.getItem("user.api_token");

  // Redirection to login in case of problem in user authentication
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;
