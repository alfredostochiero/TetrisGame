document.addEventListener('DOMContentLoaded',function(){
    
    for(let i=0;i<200;i++){
        var tag = document.createElement('div');
        var texto =  document.createTextNode('*');
        var element = document.getElementById('grid');
        //tag.appendChild(texto);
        element.appendChild(tag);
    }
    
    const grid =  document.querySelector('.grid'); // getting a single element with class grid
    let squares =  Array.from(document.querySelectorAll('.grid div')); // getting all elements with class grid and converting it into an array
    const ScoreDisplay =  document.getElementById('score');
    const StartBtn =  document.getElementById('start-button')
    const width = 10; // define a const that represents the width of the square
    
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
    let currentPosition = Math.floor(Math.random()*6);
    let rand4 = Math.floor(Math.random()*4);
    let rand5 = Math.floor(Math.random()*5);
    let current =  theTetrominoes[rand5][rand4];

   // draw the first rotation in the first tetromino

   function drawn () {
     current.forEach(index =>{
       squares[currentPosition + index].classList.add('tetromino');
     })
   }

   function undrawn() {
     current.forEach(index=>{
       squares[currentPosition + index].classList.remove('tetromino';)
     })
   }

   drawn();





})