import { useContext } from "react";
import { AuthContext } from "../../auth/authContext";
import { Navigate, useLocation } from "react-router-dom";

// ?De parametro se recibe children. Que es esto?
/*
            <PrivateRoute>
              <DashboardRoutes /> <---- CHILDREN
            </PrivateRoute>
*/
// ?Todito lo que se encuentre encerrado de un elemento/componente
export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  const url = useLocation();
  // ?Guardamos en el localStorage el path del usuario y si estaba
  // ?en busqueda, guardamos lo que estaba buscando el usuario
  localStorage.setItem("lastPath", url.pathname + url.search);

  // ?Si el usuario esta logged, renderize las rutas necesarias,
  // ?sino, navegue al login
  return user.logged ? children : <Navigate to="/login" />;
};
