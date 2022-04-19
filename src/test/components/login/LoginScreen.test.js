import { mount } from "enzyme";
import { AuthContext } from "../../../auth/authContext";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LoginScrenn } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Pruebas en el <LoginScreen />", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginScrenn />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe realizar el dispatch y la navegacion", () => {
    // ?simular login
    // ?toHaveBeenCalledWith()
    // ?mockNavigate = (/ ,{replacetrue})
    // ?localStorage.setItem('lastPath,'/dc')
    // ?simular click
    // ?esperamos que el mocknavigate fue llamado con el lastpath('/dc')
    // ?y replace true

    // ?Simulamos el click al login
    wrapper.find("button").simulate("click");
    // ?Creamos la accion para el dispatch
    const action = {
      type: types.login,
      payload: {
        name: "Esteban",
      },
    };

    // ?Esperamos que el dispatch recibiera la action correcta
    expect(contextValue.dispatch).toHaveBeenCalledWith(action);

    // ?Esperamos que lo redireccione a la pagina correcta
    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });

    // ?Creamos un lasthPath para ver si entraria a la ultima pagina'
    // ?visitada por el usuario
    localStorage.setItem("lastPath", "/dc");
    // ?Simulamos el click
    wrapper.find("button").simulate("click");

    // ?Esperamos que redireccione a la ultima pagina visitada por
    // ?el usuario
    expect(mockNavigate).toHaveBeenCalledWith("/dc", { replace: true });
  });
});
