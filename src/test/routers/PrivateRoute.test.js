const { mount } = require("enzyme");
const { MemoryRouter, Route, Routes } = require("react-router-dom");
const { AuthContext } = require("../../auth/authContext");
const { PrivateRoute } = require("../../components/routers/PrivateRoute");

// ?Simulamos la funcion de Navigate que tiene react-router-dom
// ?En este caso, renderizamos un 'componente' que sea el h1
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <h1>No entro</h1>,
}));

describe("Pruebas en el <PrivateRoute/>", () => {
  // ?Simulamos la funciones de guardar en el localStorage
  Storage.prototype.setItem = jest.fn();
  test("Debe de mostrar el componente si esta autenticado y guardar en el localStorage", () => {
    const contextValue = {
      user: {
        name: "Esteban",
        logged: true,
      },
    };

    // ?Guardamos la referencia de la pagina de la que entramos, en este
    // ?caso search, pero la podemos cambiar, simplemente para que
    // ?el lastPath guardado en el storage sea cambiante
    const lastPath = "/search";

    // ?Como de parametro el PrivateRoute recibia hijos, debemos de crear
    // ?en este caso creamos un h1
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[lastPath]}>
          <PrivateRoute>
            <h1>Private Components</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // ?Como la persona esta loggeada, debe de mostrar los componentes
    // ?hijos
    expect(wrapper.find("h1").text().trim()).toBe("Private Components");

    // ?Vemos que la ultima ubicacion del localStorage sea de la que
    // ?entramos
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", lastPath);
  });

  test("Debe de bloquear el componente si no esta autenticado", () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };

    // ?Guardamos la referencia de la pagina de la que entramos, en este
    // ?caso search, pero la podemos cambiar, simplemente para que
    // ?el lastPath guardado en el storage sea cambiante
    const lastPath = "/search";

    // ?Como de parametro el PrivateRoute recibia hijos, debemos de crear
    // ?en este caso creamos un h1
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={[lastPath]}>
          <PrivateRoute>
            <h1>Private Components</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // ?Como el usuario no esta autorizado, debe de ser redireccionado
    // ?al componente creado arriba que renderiza un 'No entro'
    expect(wrapper.text()).toBe("No entro");
  });
});
