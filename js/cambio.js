export const PULSANTE_SWITCH = document.querySelector('.switch');

const mapCambio = new Map();
mapCambio.set("bandiera", "detona");
mapCambio.set("detona", "bandiera");

function nomina() {
    let nome;
    if (PULSANTE_SWITCH.dataset.stato === "bandiera") {
        PULSANTE_SWITCH.style.backgroundImage = "url(svg/bandiera.svg)";
    } else {
        PULSANTE_SWITCH.style.backgroundImage = "url(svg/Mine.svg)";
    }

    return nome;
}

const cambio = (e) => { // cambia tra bandiera e detonazione

    if (e.code == "Space" || e.target == PULSANTE_SWITCH) {
        if (PULSANTE_SWITCH.dataset.stato === "bandiera") {
          PULSANTE_SWITCH.dataset.stato = mapCambio.get("bandiera");
        } else {
          PULSANTE_SWITCH.dataset.stato = mapCambio.get("detona");
        }
    }

    nomina();
}

document.querySelector('button.switch').addEventListener('click', cambio);
document.addEventListener("keypress", cambio);