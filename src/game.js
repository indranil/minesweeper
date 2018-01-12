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
  //  this.calculateAdjacent();
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
      while(this.grid[x][y].type === -1) {
        x = Math.floor(Math.random() * this.rows);
        y = Math.floor(Math.random() * this.cols);
      }
      this.grid[x][y].isBomb();
      
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
  
  calculateAdjacent() {
    for (let i=0; i<this.rows; i++) {
      for (let j=0; j<this.cols; j++) {
        if (this.grid[i][j].type !== -1) {
          
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
        box.domElement.innerText = box.adjacent;
        box.domElement.addEventListener('click', box.reveal);
        box.domElement.addEventListener('contextmenu', e => {
          e.preventDefault();
          console.log(e.which);
        });
        row.appendChild(box.domElement);
      }
      this.domElement.appendChild(row);
    }
  }
}
