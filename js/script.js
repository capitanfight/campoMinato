// import { casella } from "./casella.js";
import {GRANDEZZA_TERRENO, PULSANTE_SWITCH, PULSTANTE_RESET, CASELLE, SCHERMATA_FINE, NUMERO_MINE} from "/js/costanti.js";
import {creaTabella, generaTerreno, creaMine, CONTATORE_BANDIERE, compareNumbers} from "/js/terreno.js";

let numBand = NUMERO_MINE;
let caselleObj = [];        // lista di caselle{}
let mine = creaMine();      // lista di mine
let statoMina = false;
let arrBand = [];

creaTabella(GRANDEZZA_TERRENO);
generaTerreno(caselleObj, mine);

const mapCambio = new Map();
mapCambio.set("bandiera", "detona");
mapCambio.set("detona", "bandiera");

function nomina() {
    let nome;
    if (PULSANTE_SWITCH.dataset.stato === "bandiera") {
        nome = mapCambio.get("detona")[0].toUpperCase();
    } else {
        nome = mapCambio.get("bandiera")[0].toUpperCase();
    }

    return nome;
}

PULSANTE_SWITCH.textContent = `${nomina()}`;

const cambio = () => { // cambia tra bandiera e detonazione
    if (PULSANTE_SWITCH.dataset.stato === "bandiera") {
        PULSANTE_SWITCH.dataset.stato = mapCambio.get("bandiera");
    } else {
        PULSANTE_SWITCH.dataset.stato = mapCambio.get("detona");
    }

    PULSANTE_SWITCH.textContent = `${nomina()}`;
}

document.querySelector('button.switch').addEventListener('click', cambio);

const reset = () => {
    generaTerreno(caselleObj, creaMine());
    SCHERMATA_FINE.style.display = "none";
    statoMina = false;
    numBand = NUMERO_MINE;
    arrBand = [];
    CONTATORE_BANDIERE.textContent = `${numBand}`;

    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        CASELLE[i].classList.remove("scoperta");
        CASELLE[i].classList.remove("mina");
        CASELLE[i].classList.remove("bandiera");
        CASELLE[i].classList.remove("erroreMina");
        CASELLE[i].classList.remove("erroreBandiera");
        CASELLE[i].textContent = "";
    }
}

PULSTANTE_RESET.addEventListener('click', reset);

for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
    document.addEventListener('click', e => {
        if (e.target.closest('.casella') == CASELLE[i] && !caselleObj[i].stato && !statoMina) {
            if (PULSANTE_SWITCH.dataset.stato === "detona") {
                caselleObj[i].scopri(CASELLE[i]);
                if (!caselleObj[i].tipo && caselleObj[i].attorno.length == 0) {
                    caselleObj[i].scopriGrande(caselleObj, i);
                }
                if (caselleObj[i].stato && caselleObj[i].tipo && !statoMina) {
                    statoMina = true;
                    SCHERMATA_FINE.style.display = "flex";
                    CASELLE[i].classList.add('mina');
                    correzione(arrBand, mine);
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
                if (arrBand.toString() == mine.toString()) {
                    SCHERMATA_FINE.style.display = "flex";
                }
            }
        }
    })
}

function correzione(arrBand, arrMine) {
    let difMine = arrMine.filter(x => !arrBand.includes(x));
    let difBand = arrBand.filter(x => !arrMine.includes(x));
    for (let i = 0; i < difMine.length; i++) {
        CASELLE[difMine[i]].classList.add("erroreMina");
    }
    for (let i = 0; i < difBand.length; i++) {
        CASELLE[difBand[i]].classList.remove("bandiera");
        CASELLE[difBand[i]].classList.remove("scoperta");
        CASELLE[difBand[i]].classList.add("erroreBandeira");
    }
}