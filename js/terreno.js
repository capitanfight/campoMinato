import { casella } from "./casella.js";
import { GRANDEZZA_TERRENO } from "./costanti.js";
import { mine } from "./script.js";
// numero mine a importare

function creaCasella(arr, pos, arrMine) {
    let tipo = false;       // inizializzo il tipo di casella da -false(non e' una mina)
    let attorno = [];

    for (let i = 0; i < mine.getMine(); i++) {
        //controllo se la casella e` una mina
        if (arrMine[i] == pos) {
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

export function generaTerreno(casObj, arrMine) {
    // creo tutti gli oggetti casella{}
    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        creaCasella(casObj, i, arrMine);
    }

    // inserisco le mine attorno alle varie caselle
    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        casObj[i].controllaAttorno(i, casObj);
    }
}