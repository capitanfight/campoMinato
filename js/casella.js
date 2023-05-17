import { LATO_DESTRO, LATO_SINISTRO, LATO_SOPRA, LATO_SOTTO, LATO_TERRENO, GRANDEZZA_TERRENO, CASELLE } from "./costanti.js";

function controlloSxDx(pos, arrObj, num) {
    if (num >= 0 && num < GRANDEZZA_TERRENO && !arrObj[num].tipo) {
        if ((LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(num)) ||
            (LATO_SOTTO.includes(pos) && !LATO_SOPRA.includes(num)) ||
            (!LATO_SOPRA.includes(pos) && !LATO_SOTTO.includes(pos))) {
            return true;
        }
    } else {
        return false;
    }
}

function controlloUpDw(tipo, pos, arrObj) {
    switch (tipo) {
        case 1: //controllo sopra, scopro sotto
            if (!LATO_SOTTO.includes(pos) && !arrObj[pos + 1].tipo) {
                return true;
            } else {
                return false;
            }
        case 2: //controllo sotto, scopro sopra
            if (!LATO_SOPRA.includes(pos) && !arrObj[pos - 1].tipo) {
                return true;
            } else {
                return false;
            }
    }
}

export class casella {
    constructor(stato, tipo, attorno) {
        this.stato = stato;         //-true scoperta -false coperta
        this.tipo = tipo;           //-true mina     -false casella normale
        this.attorno = attorno;     //lista di mine attorno;
    }

    scopri(cas) {
        this.stato = true;
        cas.dataset.stato = "scoperta";

        let num;
        if (!this.tipo) {
            num = this.attorno.length;
            if (num !== 0) {
                cas.textContent = `${num}`;     //inserisco il numero di mine attorno alla casella
            }
        }
    }

    controllaAttorno(pos, arrObj) {
        if (this.tipo) {
            //controllo sinistra
            if (!LATO_DESTRO.includes(pos)) {
                for (let i = pos + LATO_TERRENO - 1; i <= pos + LATO_TERRENO + 1; i++) {
                    if (controlloSxDx(pos, arrObj, i)) {
                        arrObj[i].attorno.push(pos);
                    }
                }
            }

            //controllo a destra
            if (!LATO_SINISTRO.includes(pos)) {
                for (let i = pos - LATO_TERRENO - 1; i <= pos - LATO_TERRENO + 1; i++) {
                    if (controlloSxDx(pos, arrObj, i)) {
                        arrObj[i].attorno.push(pos);
                    }
                }
            }
            //controllo a sopra
            if (controlloUpDw(1, pos, arrObj)) {
                arrObj[pos + 1].attorno.push(pos);
            }
            //controllo sotto
            if (controlloUpDw(2, pos, arrObj)) {
                arrObj[pos - 1].attorno.push(pos);
            }
        }
    }

    scopriGrande(arrObj, pos) {
        let t = [pos];          //array di caselle gia' controllate o in lista
        let succScop = [pos];   //array di caselle in lista
        let test = true;

        do {
            // scopre le 3 caselle sinistra
            if (!LATO_SINISTRO.includes(pos)) {
                for (let i = pos - (LATO_TERRENO + 1); i < pos - (LATO_TERRENO - 2); i++) {
                    if (controlloSxDx(pos, arrObj, i)) {
                        arrObj[i].scopri(CASELLE[i]);
                        if (arrObj[i].attorno.length == 0 && !t.includes(i)) {   // controllo che non sia una casella numerata
                            succScop.push(i);    //aggiongo una casella da controllare
                            t.push(i);
                        }

                    }
                }
            }
            // scopre le 3 caselle destra
            if (!LATO_DESTRO.includes(pos)) {
                for (let i = pos + (LATO_TERRENO + 1); i > pos + (LATO_TERRENO - 2); i--) {
                    if (controlloSxDx(pos, arrObj, i)) {
                        arrObj[i].scopri(CASELLE[i]);
                        if (arrObj[i].attorno.length == 0 && !t.includes(i)) {   // controllo che non sia una casella numerata
                            succScop.push(i);    //aggiongo una casella da controllare
                            t.push(i);
                        }
                    }
                }
            }
            //scopro la casella a sopra
            if (controlloUpDw(2, pos, arrObj)) {   //controllo che non sia una mina
                arrObj[pos - 1].scopri(CASELLE[pos - 1]);
                if (arrObj[pos - 1].attorno.length == 0 && !t.includes(pos - 1)) {   // controllo che non sia una casella numerata
                    succScop.push(pos - 1);      //aggiongo una casella da controllare
                    t.push(pos - 1);
                }
            }
            //scopro la casella a sotto
            if (controlloUpDw(1, pos, arrObj)) { //controllo che non sia una mina
                arrObj[pos + 1].scopri(CASELLE[pos + 1]);
                if (arrObj[pos + 1].attorno.length == 0 && !t.includes(pos + 1)) {   // controllo che non sia una casella numerata
                    succScop.push(pos + 1);     //aggiongo una casella da controllare
                    t.push(pos + 1);
                }
            }
            succScop.shift();   //elimino la casella appena controllata
            pos = succScop[0];  //modifico la casella da controllare
            // controllo se ci sono altre caselle da scoprire
            if (succScop.length == 0) {
                test = false;
            }

        } while (test);
    }
}