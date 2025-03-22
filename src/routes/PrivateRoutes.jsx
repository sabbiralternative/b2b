import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { Settings } from "../api";
const PrivateRoutes = ({ children }) => {
  let isTokenExpired;

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  if (token) {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp;
    isTokenExpired = expirationTime < Date.now() / 1000;
    if (isTokenExpired) {
      dispatch(logout());
      <Navigate to="/login" replace></Navigate>;
    }
  } else if (Settings.forceLogin) {
    if (!token) {
      dispatch(logout());
      <Navigate to="/login" replace></Navigate>;
    }
  }

  return children;
};

export default PrivateRoutes;
