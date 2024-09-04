import { Router } from "./router.js"

const router = new Router()

router.add("/home", "/pages/home.html")
router.add("/Universo", "/pages/Universo.html")
router.add("/exploracao" , "/pages/exploracao.html")
router.add("/", "/pages/home.html")

router.handle()



window.onpopstate = () => router.handle()  // a propriedade onpopstate trabalha com a seta de retornar a pagina que no caso deve receber a funcao handle
  
window.route = () => router.route()