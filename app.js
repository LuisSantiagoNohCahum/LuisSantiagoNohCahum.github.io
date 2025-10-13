import { Translator } from "./langs/translator.js";

var preferences = {
    lang: "es",
    theme: "light"
}

const translator = new Translator();

const changeThemeCheck = document.getElementById("change-theme-check");
const changeThemeLabel = document.getElementById("change-theme-label");
const html = document.getElementsByTagName("html")[0];
const changeLangSelect = document.getElementById("change-lang-select");

changeThemeCheck.addEventListener("change", (ev) => {
    let checked = ev.target.checked;
    changeThemeLabel.innerText = translator.getTranslation(checked ? "nav.buttons.theme-darkmode-caption" : "nav.buttons.theme-lightmode-caption");
    let theme = checked ? "dark" : "light";
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme);
})

changeLangSelect.addEventListener("change", (ev) => {
    localStorage.setItem("lang", ev.target.value);
    translator.translate();
})

document.addEventListener('DOMContentLoaded', (ev) => {
    const lang = localStorage.getItem("lang")
    if(lang) preferences.lang = lang;

    const theme = localStorage.getItem("theme")
    if(theme) preferences.theme = theme;
    
    changeLangSelect.value = preferences.lang;
    let checkAndRaiseEvent = preferences.theme === "dark"
    changeThemeCheck.checked = checkAndRaiseEvent

    // To avoid this change the attribute value for the changeThemeCheck
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