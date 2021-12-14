let allDeputadosApi = pesquisarTodosDeputados()
let allPartidosApi = pesquisarTodosPartidos()

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

window.onload = function () {
    printCardsDeputados()
    printCardsPartidos()
}

function printCardsDeputados(deputadosSelecionados = []) {

    let deputadosPrint
    let respostaAllDeputadosJson


    if (deputadosSelecionados.length == 0) {
        respostaAllDeputadosJson = JSON.parse(allDeputadosApi)
        deputadosPrint = escolherDeputadosPesquisaOuTodos([], respostaAllDeputadosJson["dados"])
    } else {
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

function pesquisarTodosPartidos() {

    let url_base_all = "https://dadosabertos.camara.leg.br/api/v2/partidos?pagina=1&itens=100"
    allHttp = new XMLHttpRequest();
    allHttp.open("GET", url_base_all, false)
    allHttp.send();
    return allHttp.response;

}

function pegarPartidos(partidosSelecionados) {

    let url_base = "https://dadosabertos.camara.leg.br/api/v2/partidos/"

    let respostaJsonNotEmpty = []

    let partidosId = [] 

    partidosSelecionados.forEach(function(partido) {
       partidosId.push(partido["id"]) 
    });

    for (let i = 0; i < 4; i++) {

        let url_full = url_base + partidosId[i]

        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", url_full, false);
        xhttp.send();

        let resposta = xhttp.response

        let respostaJson = JSON.parse(resposta)

        if (respostaJson["dados"] != 0) {
            respostaJsonNotEmpty.push(respostaJson)
        }

    }


    return respostaJsonNotEmpty 

}


function printCardsPartidos(partidosSelecionados = []) {

    let partidosPrint
    let respostaAllPartidosJson

    if (partidosSelecionados.length == 0) {
        respostaAllPartidosJson = JSON.parse(allPartidosApi)
        console.log(respostaAllPartidosJson["dados"])
        partidosPrint = escolherPartidosPesquisaOuTodos([], respostaAllPartidosJson["dados"])
    } else {
        partidosPrint = partidosSelecionados
    }

    let partidosFinal = pegarPartidos(partidosPrint)

    console.log(partidosFinal)

    console.log(partidosFinal[0]["dados"])

    console.log(partidosFinal[0]["dados"]["urlLogo"])

    let partidosCards = document.getElementById("partidosCards")

    partidosCards.innerHTML = ""

    for (let i = 0; i < 4; i++) {
        partidosCards.innerHTML += `
        <div class="divCardP">
            <div>
                <img src="${partidosFinal[i]["dados"]["urlLogo"]}" alt="Foto"> 
            </div>
            <div class="textCardP">
                <p>${partidosPrint[i]["nome"]}</p>
                 
                <p>(${partidosPrint[i]["sigla"]})</p>
            </div>
        </div>
        `
    }
}


function escolherPartidosPesquisaOuTodos(partidosPesquisa = [], partidosTodos) {

    qtdePartidos = partidosTodos.length
    let indexAleatorio = calcularArrayDeNumerosAleatoriosNaoRepetidos(4, 0, qtdePartidos - 1);
    let partidosEscolhidos = [];
    if (partidosPesquisa.length == 0) {
        for (let i = 0; i < 4; i++) {
            partidosEscolhidos.push(partidosTodos[indexAleatorio[i]]);
        }
    } else {
        for (let i = 0; i < 4; i++) {
            if (i < partidosPesquisa.length) {
                partidosEscolhidos.push(partidosPesquisa[i]);
            } else {
                partidosEscolhidos.push(partidosTodos[indexAleatorio[i]]);
            }
        }
    }
    return partidosEscolhidos;
}


function PesquisarPartido() {

    let url_base = "https://dadosabertos.camara.leg.br/api/v2/partidos?sigla="
    let partidoSiglaPesquisar = document.getElementById('partidoSigla').value;
    let url_full = url_base + partidoSiglaPesquisar

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
    let respostaAllPartidosJson = JSON.parse(allPartidosApi)
    let partidosEscolhidos = escolherPartidosPesquisaOuTodos(respostaJsonNotEmpty["dados"], respostaAllPartidosJson["dados"])

    printCardsPartidos(partidosEscolhidos)
}