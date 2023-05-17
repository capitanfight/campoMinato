//modificabili
export const LATO_TERRENO = 15;
export const NUMERO_MINE = 35;

//derivati
export const GRANDEZZA_TERRENO = LATO_TERRENO * LATO_TERRENO;
export const CASELLE = document.getElementsByClassName("casella");
export const SCHERMATA_FINE = document.getElementById("schermata");
export const PULSANTE_SWITCH = document.querySelector('.switch');
export const PULSTANTE_RESET = document.querySelector('.retry')

// funzione che calcola i numeri a lato della griglia
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
export const LATO_SOTTO = calcLato(1);
export const LATO_SOPRA = calcLato(2);
export const LATO_SINISTRO = calcLato(3);
export const LATO_DESTRO = calcLato(4);