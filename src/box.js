// bomb is -1
// not bomb is 1

export default class Box {
  constructor(x, y, type = 1, revealed = false) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.revealed = revealed;
    this.adjacent = 0;
    this.flagged = false;
    this.domElement = document.createElement('div');
    
    this.flag = this.flag.bind(this);
    this.reveal = this.reveal.bind(this);
  }
  
  setAsBomb() {
    this.type = -1;
    this.adjacent = null;
  }
  
  incrementAdjacent() {
    if (!this.isBomb()) {
      this.adjacent += 1;
    }
  }
  
  isBomb() {
    return this.type === -1;
  }
  
  isEmptyAround() {
    return this.adjacent === 0;
  }
  
  flag() {
    if (!this.revealed) {
      this.flagged = !this.flagged;
      this.domElement.innerText = this.flagged ? '🚩' : '';
    }
  }
  
  reveal() {
    this.revealed = true;
    this.drawRevealed();
  }
  
  drawRevealed() {
    this.domElement.classList.add('revealed');
    let symbol = (this.adjacent === 0) ? '' : this.adjacent;
    if (this.isBomb()) {
      this.domElement.classList.add('bomb');
      symbol = '💣';
    }
    this.domElement.innerText = symbol;
  }
}
