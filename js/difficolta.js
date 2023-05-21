import { mine } from "./script.js";

const PULSANTE_SETTING = document.getElementById('setting');
const PULSANTE_CLOSE_SETTING = document.getElementById('close');
let stato = false;

const apriChiudi = () => {
    PULSANTE_SETTING.dataset.stato = `${!stato}`;
    stato = !stato;
}

PULSANTE_SETTING.addEventListener('click', apriChiudi);
PULSANTE_CLOSE_SETTING.addEventListener('click', apriChiudi);

const DIFF_EZ = document.getElementById('ez');
const DIFF_MID = document.getElementById('mid');
const DIFF_HARD = document.getElementById('hard');

export function cambioDiff(e) {
    if (e.target === DIFF_EZ) {
        mine.setMine(35);
        DIFF_EZ.classList.add('selezionato');
        DIFF_MID.classList.remove('selezionato');
        DIFF_HARD.classList.remove('selezionato');
    } else if (e.target === DIFF_MID) {
        mine.setMine(65);
        DIFF_MID.classList.add('selezionato');
        DIFF_EZ.classList.remove('selezionato');
        DIFF_HARD.classList.remove('selezionato');
    } else if (e.target === DIFF_HARD) {
        mine.setMine(95);
        DIFF_HARD.classList.add('selezionato');
        DIFF_MID.classList.remove('selezionato');
        DIFF_EZ.classList.remove('selezionato');
    }
}