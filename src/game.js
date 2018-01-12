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
    for (let i=0; i<this.numMines; i++) {
      let x = Math.floor(Math.random() * this.rows);
      let y = Math.floor(Math.random() * this.cols);
      while(this.grid[x][y].type === -1) {
        x = Math.floor(Math.random() * this.rows);
        y = Math.floor(Math.random() * this.cols);
      }
      this.grid[x][y].type = -1;
    }
  }
  
  drawGrid() {
    for (let i=0; i<this.grid.length; i++) {
      let row = document.createElement('div');
      row.classList.add('row');
      for (let j=0; j<this.grid[i].length; j++) {
        let box = document.createElement('div');
        box.classList.add('box');
        if (this.grid[i][j].type === -1) {
          box.classList.add('bomb');
        }
        box.addEventListener('click', e => {
          console.log(e.which);
          grid[i][j].reveal();
        });
        box.addEventListener('contextmenu', e => {
          e.preventDefault();
          console.log(e.which);
        })
        row.appendChild(box);
      }
      this.domElement.appendChild(row);
    }
  }
}
