import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginScrenn } from "../login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  // ?Importante la sintaxis de como crear el linkeo de paginas
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginScrenn />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
