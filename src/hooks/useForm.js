import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // ?Para vaciar el input
  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // ?Devolvemos los valores, y la accion de la funcion
  return [values, handleInputChange, reset];
};
