let listaNumerosSorteados = [];
let limiteNumSorteados = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

/*let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do Número Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';*/

//outra forma mais PRÁTICA e EFICAZ de escrever o código acima é através de uma função - isso evita repetições desnecessárias

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); CÓDIGO COM ERRO
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    //console.log('o botão foi clicado');
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você Acertou!!'); 

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns! Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;

        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Tente novamente!');
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número é menor que o digitado.');
        } else {
            exibirTextoNaTela('p', 'O número é maior que o digitado.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumSorteados + 1);
    let quantidadeElementosNaLista = listaNumerosSorteados.length;

    if (quantidadeElementosNaLista == limiteNumSorteados) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    } 
    //return parseInt(Math.random() * 10 + 1); 
    //o return é colocado para função retornar algo, nesse caso o num aleatório - caso ñ tivesse, nada seria retornado
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; 
    //como não queremos atribuir o valor do input a variável chute, não adicionamos o .value ao final do document.querySelector('input')
    //já no comando chute.value queremos q o valor, nesse caso o vazio, seja atribuido a variável chute
}


function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

//**IMPORTANTE
//atributos relacionados ao getElementById: removeAttribute - como o nome diz, setAttribute - colocar um novo atributo
