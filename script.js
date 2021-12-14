let allDeputadosApi = pesquisarTodosDeputados()

function PesquisarDeputado() {

    let url_base = "https://dadosabertos.camara.leg.br/api/v2/deputados?nome="
    let deputadoNomePesquisar = document.getElementById('deputadoNome').value;
    let url_full = url_base + deputadoNomePesquisar

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url_full, false);
    xhttp.send();

    let respostaJsonNotEmpty = []

    let resposta = xhttp.response
    let respostaJson = JSON.parse(resposta)
    if (respostaJson["dados"] != 0) {
        respostaJsonNotEmpty = respostaJson
    }

    respostaJson = []


    let respostaAllDeputadosJson = JSON.parse(allDeputadosApi)


    let deputadosEscolhidos = escolherDeputadosPesquisaOuTodos(respostaJsonNotEmpty["dados"], respostaAllDeputadosJson["dados"])

    printCardsDeputados(deputadosEscolhidos)

}

function escolherDeputadosPesquisaOuTodos(deputadosPesquisa = [], deputadosTodos) {

    let indexAleatorio = calcularArrayDeNumerosAleatoriosNaoRepetidos(8, 0, 512);
    let deputadosEscolhidos = [];
    if (deputadosPesquisa.length == 0) {
        for (let i = 0; i < 8; i++) {
            deputadosEscolhidos.push(deputadosTodos[indexAleatorio[i]]);
        }
    } else {
        for (let i = 0; i < 8; i++) {
            if (i < deputadosPesquisa.length) {
                deputadosEscolhidos.push(deputadosPesquisa[i]);
            } else {
                deputadosEscolhidos.push(deputadosTodos[indexAleatorio[i]]);
            }

        }

    }


    return deputadosEscolhidos;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularArrayDeNumerosAleatoriosNaoRepetidos(qtde, numMin, numMax) {
    let listaNum = [];
    for (let i = 1; i <= qtde; i++) {
        let numeroAleatorio = getRandomIntInclusive(numMin, numMax);
        if (listaNum.includes(numeroAleatorio)) {
            i--;
        } else {
            listaNum.push(numeroAleatorio);
        }
        if (listaNum.length === (numMax - numMin + 1)) {
            break;
        }
    }
    return listaNum
}

window.onload = function (){
    printCardsDeputados()
}

function printCardsDeputados(deputadosSelecionados = []) {

    let deputadosPrint 
    let respostaAllDeputadosJson 


    if (deputadosSelecionados.length == 0) {
        respostaAllDeputadosJson = JSON.parse(allDeputadosApi)
        deputadosPrint = escolherDeputadosPesquisaOuTodos([], respostaAllDeputadosJson["dados"])
    }else{
        deputadosPrint = deputadosSelecionados
    }



    let deputadosCards = document.getElementById("deputadosCards")

    deputadosCards.innerHTML = ""

    for (let i = 0; i < 8; i++) {
        deputadosCards.innerHTML += `
        <div class="divCard">
            <div>
                <img src="${deputadosPrint[i]["urlFoto"]}" alt="Foto"> 
            </div>
            <div class="textCard">
                <p>${deputadosPrint[i]["nome"]}</p>
                 
                <p>(${deputadosPrint[i]["siglaPartido"]}-${deputadosPrint[i]["siglaUf"]})</p>
            </div>
        </div>
        `
        if (i == 3) {
            deputadosCards.innerHTML += `
            <hr>
            `
        }
    }

}

function pesquisarTodosDeputados() {

    let url_base_all = "https://dadosabertos.camara.leg.br/api/v2/deputados"

    allHttp = new XMLHttpRequest();

    allHttp.open("GET", url_base_all, false)

    allHttp.send();

    return allHttp.response;

}