document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10

  // The Tetrominoes
  // Creating the L tetromino (think actual L shape in tetris ((3x1, 1x1))
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTertromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]
  const iTertromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTertromino, iTertromino]

  // deciding where the tetromino is going to show up
  let currentPosition = 4
  let currentRotation = 0
  // randomly select a Tertromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length)

  // let current = theTetrominoes[0][0]
  // [0][0] = array in an array. First array is your five Tetrominoes and the second is the array of tetromino shapes. [0][0] means show the first shape of your L tetromino 39:35 in vid

  let current = theTetrominoes[random][currentRotation]
  console.log(random)

  // Coloring/drawing the tetromino
  function draw () {
    current.forEach(index => {
      // by going through each array, you're targeting the array index and coloring from the tertromino css class
      // classList accesses our css sheet
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  // undraw the Tertromino so that we can get new shapes
  function undraw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // make the tertromino move down every second
  timerId = setInterval(moveDown, 1000)

  // assign functions to key codes (codes for keyboard), e = event, check out keycode.info
  function control (e) {
    if (e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }


  document.addEventListener('keyup', control)

  // move down function
  function moveDown () {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  function freeze () {
    // freeze function
    // Starting with squares that make up the current tetromino
    // if their index plus their width (10px down to another square) contains taken as a class in our tertromino array
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    // if at least one square is true(some() method), then turn each of the tetromino squares into a square that contains the class "taken"
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // start a new tertromino falling
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }

  // move the tetromino left, unless it's at the edge or there's blockage
  function moveLeft () {
      undraw()
      const isALeftEdge = current.some(index => (currentPosition + index) % width === 0)
      if (!isALeftEdge) currentPosition -= 1
      if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1
      }
      draw()
  }

  // move the tetromino left, unless it's at the edge or there's blockage
  function moveRight () {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

    if (!isAtRightEdge) currentPosition += 1
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }
    draw()
  }

  // rotate the tertromino
  function rotate() {
    undraw()
    currentRotation++
    // if the current rotation index is = to the amount of items in our current tetromino shape, which is 4, go back to the first item in our array (the first rotation layout again, or 0).
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }








})
