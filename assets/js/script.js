document.addEventListener('DOMContentLoaded',function(){
    
    // it creates the grids needed for the Tetris Game

    function createDiv(id,Classs="") {
      let tag =  document.createElement('div');
      let element = document.getElementById(id);
      if(Classs.length>1){
        tag.classList.add(Classs);
      }
      element.appendChild(tag)
    }


    // creates the main grid form the game
    for(let i=0;i<200;i++){
       createDiv('grid');
    }

    //  creates the bottom of the grid. When the tetromino detect it, it stops
    for(let i=0;i<10;i++){
      createDiv('grid','taken');
    }
    // creates the mini grid that show the next tetromino 
    for(let i=0;i<16;i++){
      createDiv('mini-grid')
    }



    

   

    
    
    const grid =  document.querySelector('.grid'); // getting a single element with class grid
    let squares =  Array.from(document.querySelectorAll('.grid div')); // getting all elements with class grid and converting it into an array
    const ScoreDisplay =  document.getElementById('score');
    const StartBtn =  document.getElementById('start-button')
    const width = 10; // define a const that represents the width of the square
    let nextRandom = 0;
    
    // The Forms AKA Tetrominoes
    // each item in the array represents the index of the div corresponding to the square that makes the Tetromino

    const LTetromino = [
        [1,width+1,width*2+1,2],             // indexes 1,11,21,2
        [width,width+1,width+2,width*2+2],   // indexes 10,11,12,22
        [1,width+1,width*2+1,width*2],       // indexes 1,11,21,20
        [width, width*2,width*2+1,width*2+2] // index 10,20,21,22
    ]
    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [LTetromino,zTetromino,tTetromino,oTetromino,iTetromino];

    // The current Position where the tetromino will appear
    let currentPosition = Math.floor(Math.random()*6); // 1
    let currentRotation = 0;
    let random = Math.floor(Math.random()*5); // 5 being the number of Tetrominoes in the game
    let current =  theTetrominoes[random][currentRotation];

   // draw the first rotation in the first tetromino

   function drawn () {
     current.forEach(index =>{
       squares[currentPosition + index].classList.add('tetromino');
     })
   }

   function undrawn() {
     current.forEach(index=>{
       squares[currentPosition + index].classList.remove('tetromino');
     })
   }
   
    // make the tetromino move down every second(1,000 milisecond)
    function dificulty(option){
      op = 1000;
      switch(option){
        case 'easy':
        op = 1000
        break;

        case 'medium':
        op = 500
        break

        case 'hard':
        op = 200
        break;
      }
      return op;

    }

    timeId = setInterval(moveDown,dificulty('hard'));

    // assign functions to keyCodes
    function control(e){
      e = e.keyCode;
      switch(e){
        case 37:
        moveLeft()
        break;

        case 39:
        moveRight()
        break;

        case 38:
        rotate()
        break;
      }
      

    }

    document.addEventListener('keyup',control);
   

    // moves the tetromino down by undrawing it and drawing in the div bellow
    function moveDown() {
      undrawn();
      currentPosition += width;
      drawn();
      freeze();
      
    }

  // freeze function
  function freeze() {
    if(current.some(index=>squares[currentPosition+index+width].classList.contains('taken'))){
      current.forEach(index => squares[currentPosition +index].classList.add('taken'))
      // start a new tetromino falling
      random =  nextRandom;
      nextRandom = Math.floor(Math.random()*theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4
      drawn();
      displayShape();
    }
  }

  // moves the tetromino to the left
  function moveLeft() {
    undrawn()
    // check if the tetromino is in an index that is multiple of 10, in this case it is in the leftmost position
    const isAtLeftEdge = current.some(index =>(currentPosition + index)% width == 0) 
    if(!isAtLeftEdge) {
      currentPosition -= 1; // if the tetromino is not on the leftEdge, it can move to left
    }
    if(current.some(index=>squares[currentPosition + index].classList.contains('taken'))){
      currentPosition += 1;
    }

    drawn()
  }

  function moveRight() {
    undrawn()
    const isAtRightEdge =  current.some(index=>(currentPosition + index)%width == width - 1)
    if(!isAtRightEdge){
      currentPosition += 1
    }
    if(current.some(index=>squares[currentPosition + index ].classList.contains('taken'))){
      currentPosition -= 1
    }
    drawn()
  }

  // rotate the tetromino

  function rotate() {
    undrawn();
    currentRotation++;
    // if current rotation reaches the last one, it loops back to the first one
    if(currentRotation === current.length){
      currentRotation = 0
    }
    current =  theTetrominoes[random][currentRotation];
    drawn()
  }

  // show up next tetromino in mini-grid display

  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  // the Tetrominos without rotation

  const upNextTetrominoes= [
    [1,displayWidth+1,displayWidth*2+1,2],      // First Rotation of the Ltetromino
    [0,displayWidth,displayWidth+1,displayWidth*2+1],  // F. R. of hte Ztetromino
    [1,displayWidth,displayWidth+1,displayWidth+2],    // F. R. of the ttetromino
    [0,1,displayWidth,displayWidth+1],          // F. R of the Otetromino
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1] // F. R of the Itetromino

  ]

  // display the shame in the mini-grid display

  function displayShape() {
    //remove any frace of a tetromino from the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    // add the tetromino to the mini grid
    upNextTetrominoes[nextRandom].forEach(index =>{
      displaySquares[displayIndex + index].classList.add('tetromino')
    })

  }
   



})