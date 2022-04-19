import { useContext } from "react";
import { AuthContext } from "../../auth/authContext";
import { Navigate } from "react-router-dom";

// ?De parametro se recibe children. Que es esto?
/*
            <PrivateRoute>
              <DashboardRoutes /> <---- CHILDREN
            </PrivateRoute>
*/
// ?Todito lo que se encuentre encerrado de un elemento/componente
export const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return !user.logged ? children : <Navigate to="/" />;
};
