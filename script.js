let allDeputadosApi = pesquisarTodosDeputados()

function PesquisarDeputado() {

    let url_base = "https://dadosabertos.camara.leg.br/api/v2/deputados?nome="
    let deputadoNomePesquisar = document.getElementById('deputadoNome').value;
    console.log(deputadoNomePesquisar);
    let url_full = url_base + deputadoNomePesquisar

    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url_full, false);
    xhttp.send();

    let resposta = xhttp.response
    let respostaJson = JSON.parse(resposta)
    console.log(respostaJson)
    if (respostaJson["dados"] != 0) {
        let nome = respostaJson["dados"][0]["nome"]
    }


    //<filiacaoPartidaria></filiacaoPartidaria>



}

function printCardsDeputados() {
    let deputadosInfo = []

    let respostaAllDeputados = allDeputadosApi
    let respostaAllDeputadosJson = JSON.parse(respostaAllDeputados)

    deputadosCards = document.getElementById("deputadosCards")
    deputadosCards.innerHTML = ''

    for (let i = 0; i < 8; i++) {
        deputadosCards.innerHTML += `
        <div>
            <div>
                <img src="${respostaAllDeputadosJson["dados"][0]["urlFoto"]}" 
            </div>
            <div>
                <p>${respostaAllDeputadosJson["dados"][0]["nome"]} 
                ${respostaAllDeputadosJson["dados"][0]["siglaPartido"]}-
                ${respostaAllDeputadosJson["dados"][0]["siglaUf"]} </p>
            </div>
        </div>
        `

    }

}

function pesquisarTodosDeputados() {

    let url_base_all = "https://dadosabertos.camara.leg.br/api/v2/deputados"

    allHttp = new XMLHttpRequest();

    allHttp.open("GET", url_base_all, false)

    allHttp.send();

    return allHttp.response;

}