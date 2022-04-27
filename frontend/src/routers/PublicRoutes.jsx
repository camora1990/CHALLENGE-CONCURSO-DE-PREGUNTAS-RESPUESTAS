import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const PublicRoutes = ({ children }) => {
  const { player } = useContext(AuthContext);
  return player.logged ? <Navigate to="/juego" /> : children;
};
