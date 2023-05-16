//modificabili
const LATO_TERRENO = 15;
const NUMERO_MINE = 30;
//derivati
const DIMENSIONI_CASELLE = 250 - (LATO_TERRENO * 13);
const GRANDEZZA_TERRENO = LATO_TERRENO * LATO_TERRENO;
const CASELLE = document.getElementsByClassName("casella");
const SCHERMATA_FINE = document.getElementsByClassName("schermata");
const PULSANTE_RIPROVA = document.getElementById("retry");
const PULSANTE_SWITCH = document.querySelector('.switch');
const CONTATORE_BANDIERE = document.querySelector(".numBand");
let numBand = NUMERO_MINE;
//modifico la griglia del body
document.body.style.gridTemplateColumns = `1fr repeat(${LATO_TERRENO}, ${DIMENSIONI_CASELLE}px) 1fr`
document.body.style.gridTemplateRows = `1fr repeat(${LATO_TERRENO}, ${DIMENSIONI_CASELLE}px) 1fr`
// inserisco il numero di bandiere
CONTATORE_BANDIERE.textContent = `${numBand}`;

function calcLato(tipo) {
    let arr = [];
    switch (tipo) {
        case 1:
            for (let i = 0; i < LATO_TERRENO; i++) {
                arr[i] = LATO_TERRENO - 1 + LATO_TERRENO * i;
            }
            break;
        case 2:
            arr[0] = 0;
            for (let i = 0; i < LATO_TERRENO - 1; i++) {
                arr[i + 1] = LATO_TERRENO + LATO_TERRENO * i;
            }
            break;
        case 3:
            for (let i = 0; i < LATO_TERRENO; i++) {
                arr[i] = i;
            }
            break;
        case 4:
            let j = 0
            for (let i = GRANDEZZA_TERRENO - 1; i > GRANDEZZA_TERRENO - LATO_TERRENO - 1; i--) {
                arr[j] = i;
                j++;
            }
    }

    return arr;
}

// lati campo
const LATO_SOTTO = calcLato(1);
const LATO_SOPRA = calcLato(2);
const LATO_SINISTRO = calcLato(3);
const LATO_DESTRO = calcLato(4);

function calcAng(tipo) {
    switch (tipo) {
        case 1:
            return 0;
        case 2:
            return LATO_TERRENO - 1;
        case 3:
            return GRANDEZZA_TERRENO - LATO_TERRENO;
        case 4:
            return GRANDEZZA_TERRENO - 1;
    }
}

// angoli campo
const ANGOLO_ALTO_SINISTRA = calcAng(1);
const ANGOLO_ALTO_DESTRA = calcAng(2);
const ANGOLO_BASSO_SINISTRA = calcAng(3);
const ANGOLO_BASSO_DESTRA = calcAng(4);
const ANGOLI = [ANGOLO_ALTO_SINISTRA, ANGOLO_ALTO_DESTRA, ANGOLO_BASSO_SINISTRA, ANGOLO_BASSO_DESTRA];

const mapCambio = new Map();
mapCambio.set("bandiera", "detona");
mapCambio.set("detona", "bandiera");

class casella {
    constructor(stato, tipo, attorno) {
        this.stato = stato;         //-true scoperta -false coperta
        this.tipo = tipo;           //-true mina     -false casella normale
        this.attorno = attorno;     //lista di mine attorno;
    }

    scopri(cas) {
        this.stato = true;
        cas.classList.add('scoperta');
        let num;

        if (!this.tipo) {
            num = this.attorno.length;
            if (num !== 0) {
                cas.textContent = `${num}`;     //inserisco il numero di mine attorno alla casella
            }
        }
    }
}

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
};

function generaColonna(cont) {
    for (let i = 1; i < LATO_TERRENO; i++) {
        if (cont % LATO_TERRENO != 0) {
            if (cont % LATO_TERRENO == i) {
                cont = i;
                break;
            }
        } else {
            cont = LATO_TERRENO;
        }
    }

    let num = cont;
    let colonna = "colonna" + cont;

    let arr = [colonna, num];

    return arr;
}

function generaRiga(cont) {
    for (let i = 1; i <= LATO_TERRENO; i++) {
        if (cont / LATO_TERRENO <= i) {
            cont = i;
            break;
        }
    }

    let num = cont;
    let riga = "riga" + cont;

    let arr = [riga, num];

    return arr;
}

function creaTabella(nCas) {
    for (let i = 1; i <= nCas; i++) {

        let arrRiga = generaRiga(i);
        let riga = arrRiga[0];
        let numRiga = arrRiga[1];
        let arrColonna = generaColonna(i);
        let colonna = arrColonna[0];
        let numColonna = arrColonna[1];

        //creo la casella
        const griglia = document.createElement("div");
        //inserisco alla casella le classi
        griglia.classList.add("casella");
        griglia.classList.add(riga);
        griglia.classList.add(colonna);
        // inserisco la posizione della casella
        griglia.style.gridColumn = `${numRiga + 1}`;
        griglia.style.gridRow = `${numColonna + 1}`;
        // isnerosco la casella nel HTML
        document.body.appendChild(griglia);
    }
}

function compareNumbers(a, b) {
    return a - b;
}

function creaMine() {
    let mine = [];

    for (let i = 0; i < NUMERO_MINE; i++) {
        // genero un numero a caso in cui verra' inserita una mina
        num = Math.random() * GRANDEZZA_TERRENO;
        // arrotondo il numero generato
        arrNum = Math.floor(num);

        // tolgo il numero massimo (perche' ha pochissima probabilita' di essere scelto) e il numero generato se e' ripetuto
        if (arrNum != GRANDEZZA_TERRENO &&
            !mine.includes(arrNum)) {
            mine[i] = arrNum;
        } else i--;
    }
    mine.sort(compareNumbers);

    console.log("La posizione delle mine e`:", mine);
    return mine;
}

function creaAttorno(pos, arrObj) {
    if (arrObj[pos].tipo) {
        //controllo a sinistra
        if (!LATO_DESTRO.includes(pos)) {
            for (let i = pos + LATO_TERRENO - 1; i <= pos + LATO_TERRENO + 1; i++) {
                if (i >= 0 && i <= GRANDEZZA_TERRENO - 1 && !arrObj[i].tipo) {
                    if ((LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(i)) ||
                        (LATO_SOTTO.includes(pos) && !LATO_SOPRA.includes(i)) ||
                        (!LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(pos))) {
                        arrObj[i].attorno.push(pos);
                    }
                }
            }
        }
        //controllo a destra
        if (!LATO_SINISTRO.includes(pos)) {
            for (let i = pos - LATO_TERRENO - 1; i <= pos - LATO_TERRENO + 1; i++) {
                if (i >= 0 && i <= GRANDEZZA_TERRENO - 1 && !arrObj[i].tipo) {
                    if ((LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(i)) ||
                        (LATO_SOTTO.includes(pos) && !LATO_SOPRA.includes(i)) ||
                        (!LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(pos))) {
                        arrObj[i].attorno.push(pos);
                    }
                }
            }
        }
        //controllo a sopra
        if (!LATO_SOTTO.includes(pos) && !arrObj[pos + 1].tipo) {
            arrObj[pos + 1].attorno.push(pos);
        }
        //controllo sotto
        if (!LATO_SOPRA.includes(pos) && !arrObj[pos - 1].tipo) {
            arrObj[pos - 1].attorno.push(pos);
        }
    }
}

function creaCasella(arr, pos, mine) {
    let tipo = false;       // inizializzo il tipo di casella da -false(non e' una mina)
    let attorno = [];

    for (let i = 0; i < NUMERO_MINE; i++) {
        //controllo se la casella e` una mina
        if (mine[i] == pos) {
            tipo = true;
            CASELLE[pos].classList.add("mina");
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

function generaTerreno(caselleObj, mine) {
    // creo tutti gli oggetti casella{}
    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        creaCasella(caselleObj, i, mine);
    }
    for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
        creaAttorno(i, caselleObj);
    }
}

function scopriGrande(arrObj, pos) {
    let t = [pos];          //array di caselle gia' controllate o in lista
    let succScop = [pos];   //array di caselle in lista
    test = true;

    do {
        // scopre le 3 caselle sinistra
        if (!LATO_SINISTRO.includes(pos)) { // !ANGOLI.includes(pos)
            for (let j = pos - (LATO_TERRENO + 1); j < pos - (LATO_TERRENO - 2); j++) {
                if (j >= 0 && j <= GRANDEZZA_TERRENO - 1) { // escludo i numeri negativi e oltre a quelli necessari
                    if ((LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(j)) ||
                        (LATO_SOTTO.includes(pos) && !LATO_SOPRA.includes(j)) ||
                        (!LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(pos))) {
                        if (!arrObj[j].tipo) {   //controllo che non sia una mina
                            arrObj[j].scopri(CASELLE[j]);

                            if (arrObj[j].attorno.length == 0 && !t.includes(j)) {   // controllo che non sia una casella numerata
                                succScop.push(j);    //aggiongo una casella da controllare
                                t.push(j);
                            }
                        }
                    }
                }
            }
        }

        // scopre le 3 caselle destra
        if (!LATO_DESTRO.includes(pos)) { //!ANGOLI.includes(pos)
            for (let j = pos + (LATO_TERRENO + 1); j > pos + (LATO_TERRENO - 2); j--) {
                if (j >= 0 && j <= (LATO_TERRENO * LATO_TERRENO - 1)) {
                    if ((LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(j)) ||
                        (LATO_SOTTO.includes(pos) && !LATO_SOPRA.includes(j)) ||
                        (!LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(pos))) {
                        if (!arrObj[j].tipo) {   //controllo che non sia una mina
                            arrObj[j].scopri(CASELLE[j]);

                            if (arrObj[j].attorno.length == 0 && !t.includes(j)) {   // controllo che non sia una casella numerata
                                succScop.push(j);    //aggiongo una casella da controllare
                                t.push(j);
                            }
                        }
                    }
                }
            }
        }

        //scopro la casella a sopra
        if (!LATO_SOPRA.includes(pos)) {
            if (!arrObj[pos - 1].tipo) {   //controllo che non sia una mina
                arrObj[pos - 1].scopri(CASELLE[pos - 1]);

                if (arrObj[pos - 1].attorno.length == 0 && !t.includes(pos - 1)) {   // controllo che non sia una casella numerata
                    succScop.push(pos - 1);      //aggiongo una casella da controllare
                    t.push(pos - 1);
                }
            }
        }

        //scopro la casella a sotto
        if (!LATO_SOTTO.includes(pos)) {
            if (!arrObj[pos + 1].tipo) {   //controllo che non sia una mina
                arrObj[pos + 1].scopri(CASELLE[pos + 1]);

                if (arrObj[pos + 1].attorno.length == 0 && !t.includes(pos + 1)) {   // controllo che non sia una casella numerata
                    succScop.push(pos + 1);     //aggiongo una casella da controllare
                    t.push(pos + 1);
                }
            }
        }

        console.log(succScop);
        succScop.shift();   //elimino la casella appena controllata
        pos = succScop[0];  //modifico la casella da controllare

        // controllo se ci sono altre caselle da scoprire
        if (succScop.length == 0) {
            test = false;
        }

    } while (test);
}

let caselleObj = [];        // lista di caselle{}
let mine = creaMine();      // lista di mine
let statoMina = false;
let succScop = [];          // lista caselle che scuccessivamente verranno scoperte
let arrBand = [];

creaTabella(GRANDEZZA_TERRENO);
generaTerreno(caselleObj, mine);
console.log(caselleObj);

const reset = () => {
    generaTerreno(caselleObj, creaMine());
    SCHERMATA_FINE[0].style.display = "none";
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

for (let i = 0; i < GRANDEZZA_TERRENO; i++) {
    document.addEventListener('click', e => {
        if (e.target.closest('.casella') == CASELLE[i] && !caselleObj[i].stato && !statoMina) {
            if (PULSANTE_SWITCH.dataset.stato === "detona") {
                caselleObj[i].scopri(CASELLE[i]);
                if (!caselleObj[i].tipo && caselleObj[i].attorno.length == 0) {
                    scopriGrande(caselleObj, i);
                    console.log("ok");
                }
                if (caselleObj[i].stato && caselleObj[i].tipo && !statoMina) {
                    statoMina = true;
                    SCHERMATA_FINE[0].style.display = "flex";
                    CASELLE[i].classList.add('mina');
                    correzione(arrBand, mine);
                }
            } else if (PULSANTE_SWITCH.dataset.stato === "bandiera") {
                if (!arrBand.includes(i)) {
                    CASELLE[i].classList.add("bandiera");
                    arrBand.push(i);
                    arrBand.sort(compareNumbers);
                    numBand--;
                    console.log(arrBand);
                } else {
                    let index = arrBand.indexOf(i);
                    arrBand.splice(index, 1);
                    numBand++;
                    CASELLE[i].classList.remove("bandiera");
                }
                CONTATORE_BANDIERE.textContent = `${numBand}`;
                if (arrBand.toString() == mine.toString()) {
                    SCHERMATA_FINE[0].style.display = "flex";
                    console.log("win");
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