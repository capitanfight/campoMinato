import { start, arrCasObj as caselleObj } from "./script.js";
import { GRANDEZZA_TERRENO, CASELLE, SCHERMATA_FINE } from "./costanti.js";
import { mine } from "./script.js";

const PULSTANTE_RESET_SCHERMATA = document.querySelector('.retry');
const PULSTANTE_RESET = document.querySelector('.reset');

const reset = () => {
    start(mine.getMine());
    SCHERMATA_FINE.style.display = "none";

    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        CASELLE[i].dataset.stato = "coperta";
        CASELLE[i].classList.remove("mina");
        CASELLE[i].classList.remove("bandiera");
        CASELLE[i].classList.remove("erroreMina");
        CASELLE[i].classList.remove("erroreBandiera");
        CASELLE[i].textContent = "";
    }
}

PULSTANTE_RESET_SCHERMATA.addEventListener('click', reset);
PULSTANTE_RESET.addEventListener('click', reset);


export function correzione(arrBand, arrMine) {
    let difMine = arrMine.filter(x => !arrBand.includes(x));
    let difBand = arrBand.filter(x => !arrMine.includes(x));
    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        caselleObj[i].scopri(CASELLE[i]);
    }
    for (let i = 0; i < difMine.length; i++) {
        CASELLE[difMine[i]].classList.add("erroreMina");
        CASELLE[difMine[i]].classList.add("mina");
    }
    for (let i = 0; i < difBand.length; i++) {
        CASELLE[difBand[i]].classList.remove("bandiera");
        CASELLE[difBand[i]].classList.remove("scoperta");
        CASELLE[difBand[i]].classList.add("erroreBandiera");
    }
}