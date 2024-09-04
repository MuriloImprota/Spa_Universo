export class Router {    //exportar a classe Router
    routes = {}         //a classe router é um objeto
    add(routeName, page) { //esse objeto é composto por dois parametros, o nome da rota e a pagina
        this.routes[routeName] = page //cria uma instancia para atribuir o nome da rota para a pagina associada.
    }

    route(event) { //funçao modular que recebe um evento
        event = event || window.event //vai buscar sempre um evento ou uma janela de evento
        event.preventDefault()  //evita da pagina recarregar
        window.history.pushState({}, "", event.target.href) //histórico de navegação do navegador.
        // {}: O primeiro argumento é um objeto de estado, que pode conter informações sobre a nova entrada do histórico (aqui está vazio).
        // "": O segundo argumento é o título da nova entrada do histórico (aqui está vazio, o que significa que não será alterado).
        // event.target.href: O terceiro argumento é a URL que será adicionada ao histórico, que é extraída do href do elemento que foi clicado (o alvo do evento).    

        this.handle() // responsável por renderizar a nova página ou componente correspondente à URL que foi adicionada ao histórico
    }



    handle() {
        const { pathname } = window.location //uma constante pathname que referencia a propriedade location para pegar o próprio pathaname
        const route = this.routes[pathname] || this.routes[404] //uma constante que recebe o pathname nas rotas

        fetch(route).then(data => //fetch é uma propriedade assincrona feita para devolver algo, após todo o carregamento, nesse caso uma função
            data.text() //extrai o conteúdo da resposta em formato de texto (HTML no caso de uma página).
        ).then(html => {
            document.querySelector("#page").innerHTML = html //todo o conteudo html é extraido e injetado no elemento da pagina que tem o id app
            this.updateBodyBackground(pathname) // Atualize o fundo após a página ser carregada
        })

    }

    updateBodyBackground(pathname) {
        const body = document.querySelector('body');

        // Remove todos os estilos de fundo anteriores
        body.style.background = '';

        // Define o background com base no pathname
        if (pathname === '/home' || pathname === '/') {
            body.style.background = 'url(images/montanhas_universo.svg) no-repeat center center';
            body.style.backgroundSize = 'cover';
        } else if (pathname === '/Universo') {
            body.style.background = 'url(images/montanha_universo2.svg) no-repeat center center';
            body.style.backgroundSize = 'cover';
        } else if (pathname === '/exploracao') {
            body.style.background = 'url(images/montanha_universo3.svg) no-repeat center center';
            body.style.backgroundSize = 'cover';
        }
    }

}

