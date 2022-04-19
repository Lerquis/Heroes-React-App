import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

// !IMPORTANTE QUE EL NOMBRE SEA mockNavigate, que tenga el MOCK. Sino
// !va a tener error
const mockNavigate = jest.fn();
// ?tenemos que simular el useNavigate. Eso forma parte de react-router
// ?entonces simulamos mediante un mock, una funcion que nos devuelve
// ?todas las funciones de jest mediante un spread (...) y podemos
// ?sobreescribir la funcion que ocupamos, que es el useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Pruebas en el <SearchScreen/>", () => {
  test("Debe de mostrarse correctamente con valores por defecto", () => {
    // ?Tiene que estar adentro del memoryRouter lo que deseamos
    // ?probar
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    // ?Esperamos que el texto que tenga esa clase, sea el escrito
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero!!");
  });

  test("Debe de mostrar a 'Batman' y el input con el valor del queryString", () => {
    // ?Tiene que estar adentro del memoryRouter lo que deseamos
    // ?probar, en este caso le agregamos el queryString para buscar
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchScreen />
      </MemoryRouter>
    );
    // ?Esperamos que el valor que tiene el input sea de batman
    expect(wrapper.find("input").prop("value")).toBe("batman");
  });

  test("Debe de mostrar el mensaje de error si no encuentra el hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchScreen />
      </MemoryRouter>
    );
    // ?Ahora lo hacemos tirando un error de que no encontro un hero
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      "No hay resultados para: batman123"
    );
  });

  test("Debe de llamar el navigate a la nueva pantalla", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchScreen />
      </MemoryRouter>
    );
    // ?Buscamos el input y simulamos un cambio en el target que
    // ?tenga ese name y le asignamos ese value
    wrapper
      .find("input")
      .simulate("change", { target: { name: "searchText", value: "batman" } });

    // ?Ahora buscamos el form y seleccionamos su propiedad de la
    // ?funcion de submit
    // ?Como el onSubmit tiene de parametro un evento y tenemos el prevent
    // ?de ese evento, tenemos que enviarselo para que no tire error
    wrapper.find("form").prop("onSubmit")({ preventDefault: () => {} });

    // ?Esperamos que el mockNavigate, es decir, el useNavigate, se
    // ?haya llamado
    expect(mockNavigate).toHaveBeenCalled();

    // ?Esperamos que el mockNavigate se haya llamado con ?q=batman
    // ?que es el valor que le pusimos al input
    expect(mockNavigate).toHaveBeenCalledWith("?q=batman");
  });
});
