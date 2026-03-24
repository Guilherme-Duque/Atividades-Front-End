const bicho = document.getElementById("bicho");
const btn = document.getElementById("btn");

const estados = {
    normal:"bichofofo.jpg",
    clicado:"comendo.png",
    alimentado:"cheio.png",
    fome30:"puto.jpg",
    fome60:"morto.png",
}

let contador = 0;
let intervalo = null;
let time_click = null;
let time_out = null;

function init_cont() {
    if(intervalo) clearInterval(intervalo)

    intervalo = setInterval(()=>{
        contador++
        console.log("Tempo: ", contador)

        if (contador == 30){
            bicho.src = estados.fome30;
        }

         if (contador == 60){
            bicho.src = estados.fome60;
        }
    }, 1000)
}

init_cont();