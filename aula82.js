const palco = window.document.getElementById("palco")
const numObjetos = window.document.getElementById("numObjetos")
const txtQuantidade = window.document.getElementById("txtQuantidade")
const btnAdicionar = window.document.getElementById("btnAdicionar")
const btnRemover = window.document.getElementById("btnRemover")

let larguraPalco = palco.offsetWidth
let alturaPalco = palco.offsetHeight
let arrayBolas = []
let numBolas = 0

class Bola{
    constructor(arrayBolas, palco){
        this.tamanho = Math.floor(Math.random() * 20) + 6
        this.r = Math.floor(Math.random() * 256)
        this.g = Math.floor(Math.random() * 256)
        this.b = Math.floor(Math.random() * 256)
        this.posX = Math.floor(Math.random() * (larguraPalco - this.tamanho))
        this.posY = Math.floor(Math.random() * (alturaPalco - this.tamanho))
        this.velX = Math.floor(Math.random() * 2) + 0.5
        this.velY = Math.floor(Math.random() * 2) + 0.5
        this.dirX = Math.random() >= 0.5 ? 1 : -1
        this.dirY = Math.random() >= 0.5 ? 1 : -1
        this.arrayBolas = arrayBolas
        this.palco = palco
        this.id = Date.now() + "_" + Math.floor(Math.random() * 100000000000000)
        this.desenhar()
        this.controle = setInterval(this.controlar, 10)
        this.eu = window.document.getElementById(this.id)
        numBolas++
        numObjetos.innerHTML = numBolas
    }

    minhaPosicao = () => {
        return this.arrayBolas.indexOf(this)
    }

    remover = () => {
        clearInterval(this.controle)
        arrayBolas = arrayBolas.filter((b) => {
            if(b.id != this.id){
                return b
            }
        })
        this.eu.remove()
        numBolas--
        numObjetos.innerHTML = numBolas
    }

    desenhar = () => {
        const div = window.document.createElement("div")
        div.setAttribute("id", this.id)
        div.setAttribute("class", "bola")
        div.setAttribute("style", `left:${this.posX}px;top:${this.posY}px;width:${this.tamanho}px;height:${this.tamanho}px;background-color:rgb(${this.r},${this.g},${this.b});`)
        this.palco.appendChild(div)
    }

    controleBordas = () => {
        if(this.posX+this.tamanho >= larguraPalco) this.dirX = -1
        if(this.posX <= 0) this.dirX = 1
        if(this.posY+this.tamanho >= alturaPalco) this.dirY = -1
        if(this.posY <= 0) this.dirY = 1
    }

    controlar = () => {
        this.controleBordas()
        this.posX += this.dirX * this.velX
        this.posY += this.dirY * this.velY
        this.eu.setAttribute("style", `left:${this.posX}px;top:${this.posY}px;width:${this.tamanho}px;height:${this.tamanho}px;background-color:rgb(${this.r},${this.g},${this.b});`)
        if((this.posX > (larguraPalco - this.tamanho)) || (this.posY > (alturaPalco - this.tamanho))){
            this.remover()
        }
    }

}

window.addEventListener("resize", (evt) => {
    larguraPalco = palco.offsetWidth
    alturaPalco = palco.offsetHeight
})

btnAdicionar.addEventListener("click", (evt) => {
    const quantidade = Number(txtQuantidade.value)
    for(let i = 0; i < quantidade; i++){
        arrayBolas.push(new Bola(arrayBolas, palco))
    }
})

btnRemover.addEventListener("click", (evt) => {
   arrayBolas.map((b) => {
        // remover as bolinhas
        b.remover() 
    })
})