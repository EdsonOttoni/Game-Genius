let order = []
let clickOrder = []
let score = 0
let counter = 10
let time = 20

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')

//cria ordem aleatória de cores
function shuffleOrder() {
  let colorOrder = Math.floor(Math.random() * 4)
  order[order.length] = colorOrder
  clickOrder = []

  for(let i in order) {
    let elementColor = createColorElement(order[i])
    lightColor(elementColor, Number(i) + 1)
  }
}

//acende a proxima cor
function lightColor (element, number) {
  number = number * 1000

  setTimeout(() => {
    element.classList.add('selected')
  }, number - 500)

  setTimeout(() => {
    element.classList.remove('selected')
  }, number)
  
  return
}

//funcao que retorna a cor
function createColorElement(color) {
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

//funcao para o clique do usuario
function click (color) {
  clickOrder[clickOrder.length] = color
  createColorElement(color).classList.add('selected')

  setTimeout(() => {
    createColorElement(color).classList.remove('selected')
    checkOrder()
  }, 250)
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
function checkOrder() {
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

// função pra o cronometro
function countdown() {
  if ((time - 1) >= -1) {
    let seg = parseInt(time);
    if(time <= 9){
      seg = '0' + seg
    }
    printTime = '00:' + seg;
    document.querySelector(".count-down").innerHTML = printTime
    setTimeout('countdown()', 1000)
    time--
  }
  if(time === -1 ){
    return gameOver()
  }
}

//funcao para proximo nivel do jogo
function nextLevel() {
  score++
  time = 20
  shuffleOrder()
}

//funcao para game over
function gameOver() {
  alert(`Pontuação: ${score}!\n Você perdeu o jogo`)
  order = []
  clickOrder = []

  playGame()
}

//funcao de inicio do jogo
function playGame() {
  alert('Iniciando novo jogo')
  score = 0

  nextLevel()
}

//eventos de clique para as cores
green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

playGame()
countdown()