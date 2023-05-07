const latoTerreno = 4;
const grandezzaTerreno = latoTerreno * latoTerreno;
const caselle = document.getElementsByClassName("casella");
const schermata = document.getElementsByClassName("schermata");
const reTryButton = document.getElementById("retry");
const LATO_DESTRO = [3, 7, 11];
const LATO_SINISTRO = [4, 8, 12];

class casella {
    constructor(stato, tipo, attorno) {
        this.stato = stato;         //-true scoperta -false coperta
        this.tipo = tipo;           //-true mina     -false casella normale
        this.attorno = attorno;     //lista di mine attorno;
    }

    scopri(cas) {
        this.stato = true;
        cas.classList.add('scoperta');
    }
}

function creaMine() {
    let mine = [];
    for (let i = 0; i < latoTerreno * 2; i++) {
        num = Math.random() * grandezzaTerreno;
        arrNum = Math.floor(num);

        if (arrNum != grandezzaTerreno &&
            !mine.includes(arrNum)) {
            mine[i] = arrNum;
        } else i--;
    }

    console.log("La posizione delle mine e`:", mine);
    return mine;
}

function creaCasella(arr, posizione, mine) {
    let tipo = false;
    let attorno = [];

    for (let i = 0; i < latoTerreno * 2; i++) {
        if (mine[i] == posizione) {
            tipo = true;
        }
        for (let j = - latoTerreno; j <= latoTerreno; j += latoTerreno * 2) {
            if (posizione == mine[i] - j) {
                attorno[i] = mine[i];
            }

            if (posizione == mine[i] - 1 &&
                !LATO_SINISTRO.includes(posizione)) {
                attorno[i] = mine[i];
            }

            if (posizione == mine[i] + 1 &&
                !LATO_DESTRO.includes(posizione)) {
                attorno[i] = mine[i];
            }
        }
    }

    attorno = attorno.filter((str) => str !== '')

    let cas = new casella(false, tipo, attorno);
    if (tipo) {
        cas.attorno = null;
    }
    arr[posizione] = cas;

    return arr;
}

function generaTerreno(caselleObj, mine) {
    for (let i = 0; i < grandezzaTerreno; i++) {
        creaCasella(caselleObj, i, mine);
    }
    console.log(caselleObj);
}

function scopriGrande(pos, arrObj, arrMine) {
    let casScop = true; //-true ci sono ancora caselle da scoprire -false le caselle da scoprire sono finite 
    let caselleScoperte = [];
    let oldArr = [];
    let t;
    let i = 0;
    let j = 1;

    do {
        if (Array.isArray(arrObj[pos].attorno)) {
            if (pos > 3 && !arrMine.includes(pos - 4)) {
                arrObj[pos - 4].scopri(caselle[pos - 4]);
                caselleScoperte[i] = pos - 4;
                i++;

                console.log(i);
                console.log("su");
            }
            if (pos < 12 && !arrMine.includes(pos + 4)) {
                arrObj[pos + 4].scopri(caselle[pos + 4]);
                caselleScoperte[i] = pos + 4;
                i++;

                console.log(i);
                console.log("giu");
            }
            if (pos != 0 &&
                pos != 4 &&
                pos != 8 &&
                pos != 12 &&
                !arrMine.includes(pos - 1)) {

                arrObj[pos - 1].scopri(caselle[pos - 1]);
                caselleScoperte[i] = pos - 1;
                i++;

                console.log(i);
                console.log("sinistra");
            }
            if (pos != 15 &&
                pos != 11 &&
                pos != 7 &&
                pos != 3 &&
                !arrMine.includes(pos + 1)) {

                arrObj[pos + 1].scopri(caselle[pos + 1]);
                caselleScoperte[i] = pos + 1;
                i++;

                console.log(i);
                console.log("destra");
            }
        }

        t = pos;
        pos = caselleScoperte[j];
        caselleScoperte[j] = t;
        j++;


        if (oldArr !== caselleScoperte) {
            oldArr = caselleScoperte;
        } else {
            casScop = false;
        }

        console.log(casScop);
        console.log(caselleScoperte);
        console.log(i);
    } while (casScop);
}

let caselleObj = [];
let mine = creaMine();
let statoMina = false;

generaTerreno(caselleObj, mine);


document.addEventListener('click', e => {
    if (e.target.closest("button.retry")) {
        generaTerreno(caselleObj, creaMine());
        schermata[0].style.display = "none";
        statoMina = false;

        for (let i = 0; i < grandezzaTerreno; i++) {
            caselle[i].classList.remove("scoperta");
            caselle[i].classList.remove("mina");
        }

        // console.log('ciao');
    }
})

for (let i = 0; i < grandezzaTerreno; i++) {
    document.addEventListener('click', e => {
        if (e.target.closest('.casella') == caselle[i]) {
            caselleObj[i].scopri(caselle[i]);
            if (caselleObj[i].stato && !caselleObj[i].tipo) {
                scopriGrande(i, caselleObj, mine)
            }

            // console.log(caselleObj);
        }

        if (caselleObj[i].stato && caselleObj[i].tipo && !statoMina) {
            statoMina = true;
            schermata[0].style.display = "flex";
            caselle[i].classList.add('mina');

            // console.log('esplode');
        }
    })
}
