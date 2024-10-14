export const chatGrupal = () => {
  const element = document.createElelement("div");
  element.className = "chat-grupal-view";

  const title = document.createElement("h1");
  title.innerHTML = "chat grupal";
  element.appendchild(title);

  const textArea = document.createElement("div");
  textArea.className = "chat-area";
  chatArea.textContent = "Area de chat grupal";
  element.appendchild(chatArea);

  return element;
};
