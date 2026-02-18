import fetchApi from "./api";

export const enviarForm = async (data) => {
    return await fetchApi("registros/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };