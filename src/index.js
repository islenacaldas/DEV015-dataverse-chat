import { setRootEl, setRoutes, onURLChange, navigationTo } from "../src/router.js";
import { home } from "./views/home.js";
  setRoutes({
    '/': home,
    '/404':error,

  });

  setRoutes(routes)

window.addEventListener("DOMContentLoaded", () =>{
  setRootEl(rootEl)
  onURLChange();
})
window.addEventListener("popstate",()=>{
  onURLChange()
}) ;

