import { mount } from "enzyme";
import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { authReducer } from "../../../auth/authReducer";
import { types } from "../../../types/types";

// ?Simulamos la funcion del useNavigate()
const mockNavigate = jest.fn();

// ?Tenemos que traer todas las funciones del react-router-dom para
// ?poder seleccionar useNavigate() y simularla
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Pruebas en el <Navbar />", () => {
  const contextValue = {
    // ?Le agregamos el dispatch ya que lo vamos a utilizar como un
    // ?jest.fn()
    dispatch: jest.fn(),
    user: {
      name: "Esteban",
      logged: true,
    },
  };

  // ?Tenemos que renderizar el navbar nada mas, por eso utilizamos
  // ?el routes/route
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test("Debe de mostrarse correctamente", () => {
    // ?La clase .'text-info' tiene que tener el nombre del user
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(".text-info").text().trim()).toBe("Esteban");
  });

  test("Debe de llamar el logout, llamar el navigate y el dipatch con los argumentos", () => {
    // ?Usando el mock para el navigate y el dispatch
    // ?Usando el toHaveBeenCalledWith
    // ?Simulacion de click para el logout
    wrapper.find("button").simulate("click");

    // ?Esperamos que el dispatch se llame con la accion de logout
    expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });

    // ?Le agreamos los parametros que tiene el navigate del componente
    // ?de navbar
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
