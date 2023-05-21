import { GRANDEZZA_TERRENO } from "./costanti.js"

function compareNumbers(a, b) {
    return a - b;
}

export class Mine {
    constructor (num) {
        this.num = num;
    }

    setMine(num) {
        this.num = num;
        // mine = creaMine();
        return num;
    }

    getMine() {
        return this.num;
    }

    creaMine() {
        let mine = [];
    
        for (let i = 0; i < this.num; i++) {
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
}