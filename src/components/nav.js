import { navigateTo } from "../router.js";

export const Nav = () => {
  const navContainer = document.createElement("div");
  navContainer.classList.add("nav");

  navContainer.innerHTML = `
    <div class= "nav__logo">
    <img class="nav_logo_img" src="../logos/logo_nav.svg" alt="logo" alt=DAtaverse>
    <h2>Inventores</h2>
    </div>
    <div class="nav_btn">
    < class="nav_btn__panel" id= "btn_panel> chat Grupal<button>
    <button class="nav_btn__api" id="btn_api"> Api<button>
    </div>`;

  navContainer.querySelector(".nav_logo").addEventListener("click", () => {
    navigateTo("/");
  });

/*  navContainer.querySelector("#btn_panel").addEventListener("click", () => {
    navigateTo("/chat-grupal");
  });

  navContainer.querySelector("#btn_api").addEventListener("click", () => {
    navigateTo("/api-key");
  });
*/
  return navContainer;
};
