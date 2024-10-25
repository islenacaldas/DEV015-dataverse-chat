const renderAboutView = (data) => {
    const aboutContent = `
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <button id="chatWithItem">Iniciar chat</button>
    `;
    document.getElementById('aboutContainer').innerHTML = aboutContent;
  };
  