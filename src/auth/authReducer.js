import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    // ?Si se esta loggeando
    case types.login:
      return {
        // ?Devolvemos el objeto que recibimos por el action
        ...action.payload,
        // ?Y seteamos que esta loggeado
        logged: true,
      };

    case types.logout:
      return {
        // ?Cerramos la sesion y eliminamos los datos del usuario
        logged: false,
      };
    default:
      // ?Return del objeto del usuario
      return state; 
  }
};
