const bicho = document.getElementById("bicho");
const btn = document.getElementById("btn");

const estados = {
    normal:"bichofofo.jpg",
    clicado:"comendo.png",
    alimentado:"cheio.jpg",
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

function alimentar() {
    bicho.src= estados.clicado;
    contador = 0;
    console.log("Comeu essa merda");

    if(time_click) clearInterval(time_click) 

        time_click = setTimeout(()=>{
            bicho.src = estados.alimentado;
            
            time_out = setTimeout(()=>{
                bicho.src = estados.normal;
            }, 5000);
        }, 4000);
    
}

init_cont();