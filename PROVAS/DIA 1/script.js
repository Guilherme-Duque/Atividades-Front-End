function revelar() {
    const imagem = document.querySelector('.card-img-top');
    imagem.src = "img/_vinicius_junior.png";

    const spanNome = document.querySelector('#Nome span');
    const spanRank = document.getElementById('Rank');
    const spanData = document.getElementById('Data_Nas');
    const spanAltura = document.getElementById('Alutra');
    const spanPosicao = document.getElementById('Posição ');

    spanNome.innerText = "Vinícius José Paixão de Oliveira Júnior";
    spanRank.innerText = "9,5";
    spanData.innerText = "Nascimento: 12/07/2000 (25 anos)";
    spanAltura.innerText = "Altura: 1,76 m";
    spanPosicao.innerText = "Posição: Ponta-esquerda / Atacante";

    const spans = [spanNome, spanData, spanAltura, spanPosicao];
    spans.forEach(el => {
        if (el) {
            el.className = "card-text"; 
        }
    });

    document.querySelectorAll('.placeholder-glow').forEach(g => g.classList.remove('placeholder-glow'));
    
    const botao = document.querySelector('.btn');
    botao.innerText = "REVELADO";
    botao.classList.replace('btn-primary', 'btn-success');
}    
