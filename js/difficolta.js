import { mine } from "./script.js";

const PULSANTE_SETTING = document.getElementById('setting');
let stato = false;
PULSANTE_SETTING.addEventListener('click', e => {
    PULSANTE_SETTING.dataset.stato = `${!stato}`;
    stato = !stato;
})

const DIFF_EZ = document.getElementById('ez');
const DIFF_MID = document.getElementById('mid');
const DIFF_HARD = document.getElementById('hard');

export function cambioDiff(e) {
    if (e.target === DIFF_EZ) {
        mine.setMine(35)
    } else if (e.target === DIFF_MID) {
        mine.setMine(65)
    } else if (e.target === DIFF_HARD) {
        mine.setMine(95)
    }
}