import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../components/routers/AppRouter";

describe("Pruebas en el <AppRouter/>", () => {
  // ?Creamos un useContext de manera rapida/'casera'
  const contextValue = {
    user: {
      logged: false,
    },
  };
  test("Mostrar loginScreen si no esta autenticado", () => {
    // ?Simulamos la renderizacion con el contextValue del usuario,
    // ?de manera que este no este loggeado y por ende debe de
    // ?entrar a la ruta de login
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    // ?Esperamos que el texto h1 diga LoginScreen, dandonos a
    // ?entender de que si entro al login
    expect(wrapper.find("h1").text()).toBe("LoginScreen");
  });

  test("Mostrar la pagina inicial si esta autenticado", () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{
          user: {
            logged: true,
            name: "Esteban",
          },
        }}
      >
        <AppRouter />
      </AuthContext.Provider>
    );

    // ?Tiene que encontrar la clase navbar, eso quiere decir que si
    // ?entro
    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
