export const nav= () =>{
//creacion del evento nav
const navContainer= document.createElement("div");
navContainer.classList.add("nav");

//muestra en el html el nav 
navContainer.innerHTML = `
<div class="nav__logo">
<img class="nav_logo_img" src="/src/logos/logo.svg" alt="dataverse>
<h2>Inventos Revolucionarios</h2>
</div>

<div class="nav_chat">
<button class="nav_chat__btn">Chat grupal</button>
<button class="nav_api_btn">API</button>
</div>
`;
//agrega los eventos a los botones
navContainer.querySelector(".nav_logo").addEventListener("click", ()=>{
    navigateTo('/')
})

navContainer.querySelector("nav_chat_btn").addEventListener("click", ()=>{
    navigateTo('/chat-grupal')
})

navContainer.querySelector("nav_chat__btn"). addEventListener("click", ()=>{
    navigateTo("/api");
})

return navContainer;
}