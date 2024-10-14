export const chatIndividual = () => {
  const element = document.createElement("div");
  element.className = "chat-individual-view";

  const title = document.createElement("h1");
  title.textContent = "chat-individual";
  element.appendChild("title");

  const chatArea = document.createElement("div");
  chatArea.className = "chat-area";
  chatArea.textContent = "Area de chat individual";
  elelemen.appendChild(chatArea);

  return element;
};
