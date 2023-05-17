import {casella} from "./casella.js";
import { LATO_TERRENO, GRANDEZZA_TERRENO, NUMERO_MINE, CASELLE } from "./costanti.js";

const DIMENSIONI_CASELLE = LATO_TERRENO / GRANDEZZA_TERRENO * 100;
const GRIGLIA = document.getElementById("griglia");
export const CONTATORE_BANDIERE = document.querySelector(".numBand");
const numBand = NUMERO_MINE;

//modifico la griglia del body
GRIGLIA.style.gridTemplateColumns = `1fr repeat(${LATO_TERRENO}, ${DIMENSIONI_CASELLE}%) 1fr`
GRIGLIA.style.gridTemplateRows = `1fr repeat(${LATO_TERRENO}, ${DIMENSIONI_CASELLE}%) 1fr`

// inserisco il numero di bandiere
CONTATORE_BANDIERE.textContent = `${numBand}`;

export function compareNumbers(a, b) {
    return a - b;
}
// crea griglia/terreno di gioco
function generaColonna(cont) {
    for (let i = 1; i < LATO_TERRENO; i++) {
        if (cont % LATO_TERRENO !== 0) {
            if (cont % LATO_TERRENO === i) {
                cont = i;
                break;
            }
        } else {
            cont = LATO_TERRENO;
        }
    }
    let num = cont;

    return num;
}

function generaRiga(cont) {
    for (let i = 1; i <= LATO_TERRENO; i++) {
        if (cont / LATO_TERRENO <= i) {
            cont = i;
            break;
        }
    }
    let num = cont;

    return num;
}

export function creaTabella(nCas) {
    for (let i = 1; i <= nCas; i++) {

        let numRiga = generaRiga(i);
        let numColonna = generaColonna(i);

        //creo la casella
        const griglia = document.createElement("div");
        //inserisco alla casella le classi
        griglia.classList.add("casella");
        griglia.dataset.stato = "coperta";
        // inserisco la posizione della casella
        griglia.style.gridColumn = `${numRiga + 1}`;
        griglia.style.gridRow = `${numColonna + 1}`;
        // isnerisco la casella nel HTML
        GRIGLIA.appendChild(griglia);
    }
}

//genera la posizione delle mine
export function creaMine() {
    let mine = [];

    for (let i = 0; i < NUMERO_MINE; i++) {
        // genero un numero a caso in cui verra' inserita una mina
        let num = Math.random() * GRANDEZZA_TERRENO;
        // arrotondo il numero generato
        let arrNum = Math.floor(num);

        // tolgo il numero massimo (perche' ha pochissima probabilita' di essere scelto) e il numero generato se e' ripetuto
        if (arrNum != GRANDEZZA_TERRENO &&
            !mine.includes(arrNum)) {
            mine[i] = arrNum;
        } else i--;
    }
    mine.sort(compareNumbers);

    // console.log("La posizione delle mine e`:", mine);
    return mine;
}

function creaCasella(arr, pos, mine) {
    let tipo = false;       // inizializzo il tipo di casella da -false(non e' una mina)
    let attorno = [];

    for (let i = 0; i < NUMERO_MINE; i++) {
        //controllo se la casella e` una mina
        if (mine[i] == pos) {
            tipo = true;
            // CASELLE[pos].classList.add("mina");
        }
    }

    // creo l'oggetto casella
    let cas = new casella(false, tipo, attorno);

    // se la casella e' una mina l'array attorno[] e' uguale a null 
    if (tipo) {
        cas.attorno = null;
    }

    // inserisco l'oggetto casella{} all'interno di un array
    arr[pos] = cas;

    return arr;
}

export function generaTerreno(casObj, mine) {
    // creo tutti gli oggetti casella{}
    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        creaCasella(casObj, i, mine);
        // CASELLE[i].textContent = `${i}`;
    }
    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        casObj[i].controllaAttorno(i, casObj);
    }
    // console.log(casObj);
}