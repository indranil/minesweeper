// bomb is -1
// not bomb is 1

export default class Box {
  constructor(x, y, type = 1, revealed = false) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.revealed = revealed;
    this.adjacent = 0;
    this.domElement = document.createElement('div');
    this.domElement.classList.add('box');
    
    this.reveal = this.reveal.bind(this);
  }
  
  isBomb() {
    this.type = -1;
    this.adjacent = null;
    this.domElement.classList.add('bomb');
  }
  
  incrementAdjacent() {
    if (this.type !== -1) {
      this.adjacent += 1;
    }
  }
  
  reveal() {
    if (this.revealed) {
      return;
    }
    this.revealed = true;
  //  alert('clicked on [' + this.x + '][' + this.y + ']');
  }
}
