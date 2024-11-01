export const getApiKey = () => {
  return localStorage.getItem("apiKey");
};

export const setApiKey = (apiKey) => {
  localStorage.setItem("apiKey", apiKey);
};
