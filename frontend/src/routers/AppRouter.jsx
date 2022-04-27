import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { JuegoScreen } from "../components/JuegoScreen";
import { Login } from "../components/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/juego"
          element={
            <PrivateRoutes>
              <JuegoScreen />
            </PrivateRoutes>
          }
        />

        <Route
          path="/"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
