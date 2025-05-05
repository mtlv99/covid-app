export const getEnvVariables = () =>
// eslint-disable-next-line no-unused-expressions

  // Hay un issue actualmente con Vite, no se pueden importar las variables así.
  // import.meta.env;
  // eslint-disable-next-line implicit-arrow-linebreak
  ({
    // Hay que exportarlas manualmente... :(
    VITE_MODE: import.meta.env.VITE_MODE,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  });
