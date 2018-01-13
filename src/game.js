import Box from './box';

export default class Game {
  constructor(rows, cols, mines, domElement) {
    this.rows = rows;
    this.cols = cols;
    this.numMines = mines;
    this.domElement = domElement;
    
    this.grid;
    
    this.state = {
      tilesLeft: (this.rows * this.cols) - this.numMines,
      minesLeft: this.numMines
    };
    
    this.validate();
  }
  
  setState(key, value) {
    this.state[key] = value;
  }
  
  validate() {
    if (this.rows * this.cols < this.numMines) {
      this.numMines = (this.rows * this.cols) - 1;
    }
  }
  
  setup() {
    this.setupGrid();
    this.plantMines();
    this.drawGrid();
  }
  
  setupGrid() {
    this.grid = new Array(this.rows);
    for (let i=0; i<this.rows; i++) {
      this.grid[i] = new Array(this.cols);
      for (let j=0; j<this.cols; j++) {
        this.grid[i][j] = new Box(i, j);
      }
    }
  }
  
  plantMines() {
    for (let k=0; k<this.numMines; k++) {
      let x = Math.floor(Math.random() * this.rows);
      let y = Math.floor(Math.random() * this.cols);
      while(this.grid[x][y].isBomb()) {
        x = Math.floor(Math.random() * this.rows);
        y = Math.floor(Math.random() * this.cols);
      }
      this.grid[x][y].setAsBomb();
      
      // increment the adjacent boxes' adjacent mine count
      let adjacentBoxes = this.getAdjacentBoxes(x, y);
      adjacentBoxes.forEach(function(box) {
        box.incrementAdjacent();
      });
    }
  }
  
  drawGrid() {
    for (let i=0; i<this.grid.length; i++) {
      let row = document.createElement('div');
      row.classList.add('row');
      for (let j=0; j<this.grid[i].length; j++) {
        let box = this.grid[i][j];
        box.domElement.classList.add('box');
        box.domElement.addEventListener('click', e => {
          box.reveal();
          if (box.isBomb()) {
            alert('boom');
            this.gameOver();
          } else if (box.isEmptyAround()) {
            this.flowReveal(i, j);
          }
        });
        box.domElement.addEventListener('contextmenu', e => {
          e.preventDefault();
          box.flag();
        });
        row.appendChild(box.domElement);
      }
      this.domElement.appendChild(row);
    }
  }
  
  getAdjacentBoxes(x, y) {
    let boxes = [];
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        let row = x+i;
        let col = y+j;
        if ((i === 0 && j === 0) || row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
          continue;
        }
        boxes.push(this.grid[row][col]);
      }
    }
    return boxes;
  }
  
  flowReveal(x, y) {
    let toBeRevealed = [];
    
    toBeRevealed.push(this.grid[x][y]);
    
    while (toBeRevealed.length > 0) {
      let currentBox = toBeRevealed.pop();
      let adjBoxes = this.getAdjacentBoxes(currentBox.x, currentBox.y);
      
      adjBoxes.forEach(box => {
        if (box.isEmptyAround() && box.revealed === false) {
          toBeRevealed.push(box);
        }
        box.reveal();
      });
    }
  }
  
  gameOver() {
    console.log('game over!');
  }
}
