import { grid } from './grid';
import Box from './box';

export default class Game {
  constructor(rows, cols, mines, domElement) {
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;
    this.domElement = domElement;
    
    this.grid;
    
    this.state = {
      minesLeft: this.mines
    };
  }
  
  setState(key, value) {
    this.state[key] = value;
  }
  
  setup() {
    this.setupGrid();
    this.drawGrid();
  }
  
  setupGrid() {
    let minesToPlant = this.mines;
    let type = 1;
    this.grid = grid(this.rows, this.cols);
    for (let i=0; i<this.grid.length; i++) {
      for (let j=0; j<this.grid[i].length; j++) {
        if (minesToPlant > 0 && Math.random() >= 0.5) {
          type = -1;
          minesToPlant--;
        } else {
          let type = 1;
        }
        this.grid[i][j] = new Box(i, j, type);
      }
    }
  }
  
  drawGrid() {
    for (let i=0; i<this.grid.length; i++) {
      let row = document.createElement('div');
      row.classList.add('row');
      for (let j=0; j<this.grid[i].length; j++) {
        let box = document.createElement('div');
        box.classList.add('box');
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
