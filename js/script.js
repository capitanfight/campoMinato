import { Mine } from "./mine.js";
import { generaTerreno } from "./terreno.js";
import { creaTabella } from "./tabella.js";
import { GRANDEZZA_TERRENO, CASELLE, SCHERMATA_FINE } from "./costanti.js";
import { PULSANTE_SWITCH } from "./cambio.js";
import { correzione } from "./reset.js";
import { cambioDiff } from "./difficolta.js";

function compareNumbers(a, b) {
    return a - b;
}

// pulsante scelta diffficolta'
const DIF_BUTTON = document.getElementsByClassName('difficolta');

for (let i = 0; i < DIF_BUTTON.length; i++) {
    DIF_BUTTON[i].addEventListener('click', e => {
        cambioDiff(e);
        start();
    });
}

// bandiere
const CONTATORE_BANDIERE = document.querySelector(".numBand");

// inizio codice
export let mine = new Mine(35);

export let arrCasObj;
let statoMina;
let arrBand;
let arrMine; 
let numBand;

export function start() { //num
    arrCasObj = [];
    statoMina = false;
    arrBand = [];
    numBand = mine.getMine();
    arrMine = mine.creaMine();
    CONTATORE_BANDIERE.textContent = `${numBand}`;
    generaTerreno(arrCasObj, arrMine);
    // mine.setMine(num);
}

start();
creaTabella(GRANDEZZA_TERRENO);

for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
    document.addEventListener('click', e => {
        if (e.target.closest('.casella') == CASELLE[i] && !arrCasObj[i].stato && !statoMina) {
            if (PULSANTE_SWITCH.dataset.stato === "detona" && !arrBand.includes(i)) {
                arrCasObj[i].scopri(CASELLE[i]);
                if (!arrCasObj[i].tipo && arrCasObj[i].attorno.length == 0) {
                    arrCasObj[i].scopriGrande(arrCasObj, i);
                }
                if (arrCasObj[i].stato && arrCasObj[i].tipo && !statoMina) {
                    statoMina = true;
                    SCHERMATA_FINE.style.display = "flex";
                    document.querySelector('#schermata>.content>p').textContent = "HAI PERSO!";
                    CASELLE[i].classList.add('mina');
                    correzione(arrBand, arrMine);
                }
            } else if (PULSANTE_SWITCH.dataset.stato === "bandiera") {
                if (!arrBand.includes(i)) {
                    CASELLE[i].classList.add("bandiera");
                    arrBand.push(i);
                    arrBand.sort(compareNumbers);
                    numBand--;
                } else {
                    let index = arrBand.indexOf(i);
                    arrBand.splice(index, 1);
                    numBand++;
                    CASELLE[i].classList.remove("bandiera");
                }
                CONTATORE_BANDIERE.textContent = `${numBand}`;
                if (arrBand.toString() == arrMine.toString()) {
                    SCHERMATA_FINE.style.display = "flex";
                    document.querySelector('#schermata>.content>p').textContent = "HAI VINTO!";
                }
            }
        }
    })
}
