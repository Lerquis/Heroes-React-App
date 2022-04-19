import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../components/routers/DashboardRoutes";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <DashboardRoutes/>", () => {
  const contextValue = {
    user: {
      name: "Esteban",
      logged: true,
    },
  };
  test("Debe de mostrarse correctamente", () => {
    // ?Tiene que estar adentro del memoryRouter lo que deseamos
    // ?probar
    // !El error mostrado y por lo que debemos de usar el memoryRouter
    // !es porque usa el useNavigate()
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    // ?Esperamos que en el navbar, el texto del nombre del usuario
    // ?sea el mismo enviado por los datos quemados
    expect(wrapper.find(".text-info").text().trim()).toBe("Esteban");
  });

  test("Debe de mostrarse correctamente la pagina de /DC", () => {
    // ?Tiene que estar adentro del memoryRouter lo que deseamos
    // ?probar
    // !El error mostrado y por lo que debemos de usar el memoryRouter
    // !es porque usa el useNavigate()

    // ?El initialEntries funciona para decirle a memory router a que
    // ? pagina de las del DashboardRoutes, quiere entrar
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/dc"]}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    // ?Esperamos que el h1 de la pagina, sea el titulo de la pagina de
    // ?dc
    expect(wrapper.find("h1").text().trim()).toBe("DcScreen");
  });
});
