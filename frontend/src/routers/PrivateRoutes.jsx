import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PrivateRoutes = ({ children }) => {
  const { player } = useContext(AuthContext);
  return player.logged ? children : <Navigate to="/" />;
};
