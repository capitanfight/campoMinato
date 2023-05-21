import { LATO_TERRENO, GRANDEZZA_TERRENO } from "./costanti.js";

const DIMENSIONI_CASELLE = LATO_TERRENO / GRANDEZZA_TERRENO * 100;
const GRIGLIA = document.getElementById("griglia");
//modifico la griglia del body
GRIGLIA.style.gridTemplateColumns = `1fr repeat(${LATO_TERRENO}, ${DIMENSIONI_CASELLE}%) 1fr`
GRIGLIA.style.gridTemplateRows = `1fr repeat(${LATO_TERRENO}, ${DIMENSIONI_CASELLE}%) 1fr`

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