import { getApiKey, setApiKey } from "../src/lib/apiKey.js";

describe("getApiKey", () => {
  it("debera devolver el valor API Key", () => {
    setApiKey("mi_api_key_de_prueba");
    expect(getApiKey()).toBe("mi_api_key_de_prueba");
  });
});

describe("setApiKey", () => {
  it("debera establecer correctamente la API key", () => {
    setApiKey("otra_api_key");
    expect(localStorage.getItem("openai_api_key")).toBe("otra_api_key");
  });
});
