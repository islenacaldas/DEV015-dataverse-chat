import { setApiKey } from "../lib/apiKey";

export const about = () => {
  const container = document.createElement('div')
  container.innerHTML`
  <div id="apiKeyContainer>
  <label>Ingrese su API Key:</label>
  <input tipe="text" id="apiKey" placeholder="Tu API Key de OpenAI">
  <button id=saveApiKeyBtn>Guardar API Key</button>
`;
};
