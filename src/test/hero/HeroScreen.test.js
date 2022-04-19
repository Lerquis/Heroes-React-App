import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HeroScreen } from "../../components/hero/HeroScreen";
import { mount } from "enzyme";

// ?Simulamos la funcion de useNavigate()
const mockNavigate = jest.fn();

// ?Creamos un mock para simular todas la funciones del react-router-dom
// ?y cambiamos la funcion del useNavigate para que no nos de error
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Pruebas en el <HeroScreen/>", () => {
  test("No debe de mostrar el heroScreen si no hay un hero en el url", () => {
    // ?Como en el componente de HeroScreen tenemos una validacion
    // ?de que si no encontramos un hero mediante el url, nos
    // ?devuele a '/' entonces creamos 2 rutas, la del hero sin
    // ?hero y la de '/' para probar sin mandar un hero, deberia
    // ?renderizar la pagina de '/'

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <Routes>
          <Route path="/hero" element={<HeroScreen />} />
          <Route path="/" element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // ?Como no tiene un hero, tenemos que renderizar la pagina con
    // ?ese h1
    expect(wrapper.find("h1").text().trim()).toBe("No Hero Page");
  });

  test("Mostrar un hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    // ?Esperamos que la pagina muestre el hero, por ende que el h3
    // ?sea de spider man
    expect(wrapper.find("h3").text().trim()).toBe("Spider Man");
  });

  test("Debe de regresar a la pantalla anterior", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    // ?Llamamos la funcion de regresar a la pagina anterior
    wrapper.find("button").prop("onClick")();

    // ?Como en el componente el boton de regresar navega a la pagina
    // ?anterior es -1
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("Debe de mostrar la pagina principal si no encuentra el hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider123"]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
          <Route path="/" element={<h1>Pagina principal</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // ?Como el hero no existe, esperamos que devuelva a la pagina
    // ?principal
    expect(wrapper.text()).toBe("Pagina principal");
  });
});
