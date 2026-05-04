function add(){
    const container = document.getElementById('Cards');

    const novoCard = `
        <div class="card" style="width: 22rem;">
            <img src="img/Lucas_Paqueta.webp" class="card-img-top" alt="Lucas Paquetá">
            <div class="card-body">
                <h5 class="card-title">
                    <span>Lucas Paquetá</span>
                    <span class="badge text-bg-secondary">8,8</span>
                </h5>
                <p class="card-text">
                    <span><strong>Nascimento:</strong> 27/08/1997 (28 anos)</span><br>
                    <span><strong>Altura:</strong> 1,80 m</span><br>
                    <span><strong>Posição:</strong> Meio-campista</span><br>
                </p>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', novoCard);
}

function proximo() {
    const container = document.getElementById('container-grupos');

    container.innerHTML = `
        <div class="cartao-grupo">
            <h4>Grupo 🅳</h4>
            <h5>Seleções</h5>
            <ul>
                <li>Estados Unidos</li>
                <li>Paraguai</li>
                <li>Austrália</li>
                <li>Turquia</li>
            </ul>
            <details>
                <summary><strong>Saiba Mais</strong></summary>
                <p>Os EUA jogam em casa, vantagem histórica em Copas. Austrália enfrenta frequentemente seleções sul-americanas em torneios.</p>
            </details>
        </div>

        <div class="cartao-grupo">
            <h4>Grupo 🅴</h4>
            <h5>Seleções</h5>
            <ul>
                <li>Alemanha</li>
                <li>Equador</li>
                <li>Costa do Marfin</li>
                <li>Curaçao</li>
            </ul>
            <details>
                <summary><strong>Saiba Mais</strong></summary>
                <p>Alemanha costuma dominar fases de grupos. Equador e Costa do Marfim têm estilos físicos semelhantes.</p>
            </details>
        </div>

        <div class="cartao-grupo">
            <h4>Grupo 🅵</h4>
            <h5>Seleções</h5>
            <ul>
                <li>Holanda</li>
                <li>Japão</li>
                <li>Tunísia</li>
                <li>Suécia</li>
            </ul>
            <details>
                <summary><strong>Saiba Mais</strong></summary>
                <p>Holanda e Japão possuem histórico de jogos técnicos. A Suécia retorna com uma equipe renovada.</p>
            </details>
        </div>
    `;
}