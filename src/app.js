import "./script/components/index.js";
import "./script/api/index.js";
import "./style/style.css";

if(window.location.pathname == '/notes.html'){
  const toggleForm = document.querySelector("#toggleForm");
  const form = document.querySelector("form");

  toggleForm.addEventListener("click", () => {
    form.classList.toggle("aktif");
  });
}