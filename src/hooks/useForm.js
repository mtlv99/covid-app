import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    createValidators();
  }, [formState]);

  // Detecta cuando la info de por defecto del form cambia.
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  // Se memoriza para evitar rerenders innecesarios.
  const isFormValid = useMemo(() => {
    // Si encuentra algun valor que no sea null, retorna false.
    // eslint-disable-next-line no-restricted-syntax
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      // Propiedad computada
      [name]: value,
    });
  };

  // "on" en el nombre para seguir el estandar que usa React y evts del HTML
  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    // Evalua cada validacion que fue administrada al Hook.
    // eslint-disable-next-line no-restricted-syntax
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      // Setea dinamicamente propiedades en el objeto.
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  return {
    // se devuelven todos los items del form por spread operator
    // (aunque no sé si esto sea una buena practica?)
    ...formState,
    formState,
    onInputChange,
    onReset: onResetForm,
    ...formValidation,
    isFormValid,
  };
};
