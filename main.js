let order = []
let clickOrder = []
let score = 0
let counter = 10

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')

//cria ordem aletoria de cores
const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4)
  order[order.length] = colorOrder
  clickOrder = []

  for(let i in order) {
    let elementColor = createColorElement(order[i])
    lightColor(elementColor, Number(i) + 1)
  }
}

//acende a proxima cor
const lightColor = (element, number) => {
  number = number * 1000

  setTimeout(() => {
    element.classList.add('selected')
  }, number - 500)

  setTimeout(() => {
    element.classList.remove('selected')
  }, number)

  return
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
const checkOrder = () => {
  for(let i in clickOrder) {
    if(clickOrder[i] != order[i]){
      gameOver()
      return
    }
  }
  if(clickOrder.length == order.length) {
    alert(`Pontuação: ${score}`)
    counter = 10
    nextLevel()
  }
}

//funcao para o clique do usuario
const click = (color) => {
  clickOrder[clickOrder.length] = color
  createColorElement(color).classList.add('selected')

  setTimeout(() => {
    createColorElement(color).classList.remove('selected')
    checkOrder()
  }, 250)
}

//funcao que retorna a cor
const createColorElement = (color) => {
  if(color == 0){
    return green
  } else if(color == 1){
    return red
  }else if(color == 2){
    return yellow
  }else {
    return blue
  }
}

//funcao para proximo nivel do jogo
const nextLevel = () => {
  score++
  shuffleOrder()
}

//funcao para game over
const gameOver = () => {
  alert(`Pontuação: ${score}!\n Você perdeu o jogo`)
  order = []
  clickOrder = []

  playGame()
}

//funcao de inicio do jogo
const playGame = () => {
  alert('Bem vindo ao Genius! iniciando novo jogo')
  score = 0

  nextLevel()
}

//eventos de clique para as cores
green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

playGame()