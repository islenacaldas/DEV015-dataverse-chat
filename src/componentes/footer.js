export const footer= ()=>{
    //creacion del footer
    const footer = document.createElement("footer");
    footer.classList.add("footer");
//definicion del footer
footer.innerHTML = `
<div class="footer__container">
<h4> Inventos revolucionarios</h4>
<p class="footer_text">creado por:<a class="footer_link href="https://github.com/islenacaldas">Islena Caldas</a></p> 
</div>`;

footer.querySelector(".footer__container").addEventListener("click", ()=>{
    navigateTo("/")
});

return footer;
}