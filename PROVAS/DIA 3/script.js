function add() {
    const container = document.getElementById('Cards');

    const novoJogador = `
        <div class="card" style="width: 22rem;">
            <img src="img/Lucas_Paqueta.png" class="card-img-top" alt="Lucas Paquetá">
            <div class="card-body">
                <h5 class="card-title">
                    <span>Lucas Paquetá</span>
                    <span class="badge text-bg-secondary">8,8</span>
                </h5>
                <p class="card-text">
                    <span><strong>Nascimento:</strong> 27/08/1997</span><br>
                    <span><strong>Altura:</strong> 1,80 m</span><br>
                    <span><strong>Posição:</strong> Meio-campista</span><br>
                </p>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', novoJogador);
}

function proximo() {
    const container = document.getElementById('container-grupos');

    container.innerHTML = `
        <div class="cartao">
            <h4>Grupo D</h4>
            <ul>
                <li>Estados Unidos</li>
                <li>Paraguai</li>
                <li>Austrália</li>
                <li>Turquia</li>
            </ul>
            <details>
                <summary>Saiba Mais</summary>
                <p>Os EUA jogam em casa, vantagem histórica em Copas.</p>
            </details>
        </div>

        <div class="cartao">
            <h4>Grupo E</h4>
            <ul>
                <li>Alemanha</li>
                <li>Equador</li>
                <li>Costa do Marfim</li>
                <li>Curaçao</li>
            </ul>
            <details>
                <summary>Saiba Mais</summary>
                <p>Alemanha costuma dominar fases de grupos.</p>
            </details>
        </div>
    `;
}

function mostrarTabela() {
    const img = document.createElement('img');
    img.src = 'img/Tabela_Jogos.png';
    img.style.display = 'block';
    img.style.margin = '20px auto';
    img.style.maxWidth = '100%';
    
    document.body.appendChild(img);
}

function revelar() {
    const imgPrincipal = document.querySelector('.card-img-top');
    imgPrincipal.src = 'img/_vinicius_junior.png';

    const spanNome = document.querySelector('#Nome span.placeholder');
    const spanRank = document.getElementById('Rank');
    const spanData = document.getElementById('Data_Nas');
    const spanAltura = document.getElementById('Alutra');
    const spanPosicao = document.getElementById('Posição ');

    spanNome.innerText = "Vinícius José Paixão de Oliveira Júnior";
    spanRank.innerText = "9,5";
    spanData.innerText = "12/07/2000 (25 anos)";
    spanAltura.innerText = "1,76 m";
    spanPosicao.innerText = "Ponta-esquerda / Atacante";

    const elementosParaLimpar = document.querySelectorAll('.placeholder');
    
    elementosParaLimpar.forEach(el => {
        el.classList.remove('placeholder', 'col-4', 'col-6');
        el.classList.add('card-text');
    });

    document.querySelectorAll('.placeholder-glow').forEach(glow => {
        glow.classList.remove('placeholder-glow');
    });

}