import Box from './box';

export default class Game {
  constructor(rows, cols, mines, timer, domElement, scoreDom) {
    this.rows = rows;
    this.cols = cols;
    this.numMines = mines;
    this.timer = timer;
    this.domElement = domElement;
    this.scoreDom = scoreDom;
    
    this.grid;
    
    this.state = {
      tilesLeft: (this.rows * this.cols) - this.numMines,
      minesLeft: this.numMines,
    };
    
    this.scoreDom.innerText = (''+this.state.minesLeft).padStart(3, '0');
    
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
    this.domElement.innerHTML = '';
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
          if (!this.timer.started) {
            this.timer.start();
          }
          box.reveal();
          if (box.isBomb()) {
            box.domElement.classList.add('clickedbomb');
            this.gameOver();
          } else if (box.isEmptyAround()) {
            this.flowReveal(i, j);
          }
        });
        box.domElement.addEventListener('contextmenu', e => {
          e.preventDefault();
          if (!this.timer.started) {
            this.timer.start();
          }
          box.flag();
          
          if (!box.revealed) {
            let mLeft = box.isFlagged() ? this.state.minesLeft - 1 : this.state.minesLeft + 1;
            this.setState('minesLeft', mLeft);
            
            this.scoreDom.innerText = (''+this.state.minesLeft).padStart(3, '0');
          }
        });
        row.appendChild(box.domElement);
      }
      this.domElement.appendChild(row);
    }
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
    this.revealAllBombs();
    this.timer.stop();
    console.log('game over!');
  }
  
  revealAllBombs() {
    for (let i=0; i<this.rows; i++) {
      for (let j=0; j<this.cols; j++) {
        if (this.grid[i][j].isBomb()) {
          this.grid[i][j].reveal();
        }
      }
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
}
