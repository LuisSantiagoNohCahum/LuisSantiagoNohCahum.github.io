import { Translator } from "./langs/translator.js";

const preferences = {
    lang: "es",
    theme: "light"
}

AOS.init();
const translator = new Translator();

const changeThemeCheck = document.getElementById("change-theme-check");
const html = document.getElementsByTagName("html")[0];
const changeLangSelect = document.getElementById("change-lang-select");

changeThemeCheck.addEventListener("change", (ev) => {
    let checked = ev.target.checked;
    let theme = checked ? "dark" : "light";
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme);
})

changeLangSelect.addEventListener("change", (ev) => {
    localStorage.setItem("lang", ev.target.value);
    translator.translate();
})

document.addEventListener('DOMContentLoaded', (ev) => {
    loadPreferences();
    loadDropdownMenu();

    changeLangSelect.value = preferences.lang;
    let checkAndRaiseEvent = preferences.theme === "dark"
    changeThemeCheck.checked = checkAndRaiseEvent

    translator.translate();

    if(checkAndRaiseEvent) {
        const clickEvent = new MouseEvent('change', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        
        changeThemeCheck.dispatchEvent(clickEvent);
    }
});

function loadPreferences() {
    const lang = localStorage.getItem("lang")
    if(lang) preferences.lang = lang;

    const theme = localStorage.getItem("theme")
    if(theme) preferences.theme = theme;
}

function loadDropdownMenu() {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });
}