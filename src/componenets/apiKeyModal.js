export const apiKeyModal = () => {
  const modal = document.createElement("div");
  modal.className = "api-key-modal";

  modal.innerHTML = `
  <div class="modal-content">
  <h2>Ingresa tu API key de OpenAI</h2>
  <input type="text" id="api-key" placeholder="API key">
  <button id="save-api-key">guardar API key</button>
  </div>`;
};
