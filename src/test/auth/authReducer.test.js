import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en el authReducer", () => {
  test("Debe de retornar el estado por defecto", () => {
    // ?De parametro para el auth reducer se manda un objeto, y la
    // ?accion que tambien es un objeto
    const state = authReducer({ logged: false }, {});

    // ?Como no hay accion, esperamos que state sea igual a logged: false
    expect(state).toEqual({ logged: false });
  });

  test("debe de autenticar y colocar el name del usuario", () => {
    // ?Creamos la accion para enviarla despues
    const action = {
      type: types.login,
      payload: {
        name: "Esteban",
      },
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      name: "Esteban",
    });
  });

  test("Debe de borrar el name y tener logged:false", () => {
    // ?Creacion de la accion
    const action = {
      type: types.logout,
    };
    // ?Pasamos un objeto de user loggeado
    const state = authReducer({ logged: true, name: "Esteban" }, action);
    expect(state).toEqual({
      logged: false,
    });
  });
});
