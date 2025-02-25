import "./script/components/index.js";
import "./script/api/index.js";
import "./style/style.css";

const toggleForm = document.querySelector("#toggleForm");
const form = document.querySelector("form");
toggleForm.addEventListener("click", () => {
  form.classList.toggle("aktif");
});
