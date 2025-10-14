import { langs } from "./langs.js"

export class Translator {
    #getCurrentLang() {
        const changeLangSelect = document.getElementById("change-lang-select");
        return changeLangSelect.value;
    }

    /** Translates the current page with current selected language.*/
    translate() {
        const elementsToTranslate = document.querySelectorAll('[data-translation-key]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translation-key');
            element.textContent = this.getTranslation(key);
        });
    }

    /** Get the translate text with the given key.*/
    getTranslation(key) {
        const lang = this.#getCurrentLang();
        const parts = key.split('.');
        let value = langs[lang];

        for (const part of parts) {
            if (value && value.hasOwnProperty(part)) {
                value = value[part];
            } else {
                return key;
            }
        }

        return value;
    }
}