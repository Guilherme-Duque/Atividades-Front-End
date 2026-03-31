const bicho = document.getElementById("bicho");
const btn = document.getElementById("btn");

const estados = {
    normal:"bichofofo2.png",
    clicado:"comendo2.png",
    alimentado:"cheio2.png",
    fome30:"puto2.png",
    fome60:"morto2.png",
}

let contador = 0;
let intervalo = null;
let time_click = null;
let time_out = null;

function aumentarTempo() {
    contador = contador + 5;
}

function init_cont() {
    if(intervalo) clearInterval(intervalo)

    intervalo = setInterval(()=>{
        contador++;
  
        console.log("Tempo: ", contador);

         if (contador < 30){
            document.body.style.backgroundImage = "url('fundoNormal.png')";
        }

        if (contador >= 30 && contador < 60){
            bicho.src = estados.fome30;
            document.body.style.backgroundImage = "url('fundoMedio.png')";
        }

         if (contador > 60){
            bicho.src = estados.fome60;
            document.body.style.backgroundImage = "url('fundoMerda.png')";
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