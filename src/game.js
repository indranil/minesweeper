import { grid } from './grid';
import Box from './box';

export default class Game {
  constructor(rows, cols, mines, domElement) {
    this.rows = rows;
    this.cols = cols;
    this.numMines = mines;
    this.domElement = domElement;
    
    this.grid;
    
    this.state = {
      minesLeft: this.numMines
    };
    
    this.validate();
  }
  
  validate() {
    if (this.rows * this.cols < this.numMines) {
      this.numMines = (this.rows * this.cols) - 1;
    }
  }
  
  setState(key, value) {
    this.state[key] = value;
  }
  
  setup() {
    this.setupGrid();
    this.plantMines();
    this.drawGrid();
  }
  
  setupGrid() {
    this.grid = grid(this.rows, this.cols);
    for (let i=0; i<this.grid.length; i++) {
      for (let j=0; j<this.grid[i].length; j++) {
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
      
      for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
          let row = x+i;
          let col = y+j;
          if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            continue;
          }
          this.grid[x+i][y+j].incrementAdjacent();
        }
      }
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
  
  gameOver() {
    console.log('game over!');
  }
}
