// bomb is -1
// not bomb is 1

export default class Box {
  constructor(x, y, type = 1, revealed = false) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.revealed = revealed;
    
    this.reveal = this.reveal.bind(this);
  }
  
  reveal() {
    this.revealed = true;
  //  alert('clicked on [' + this.x + '][' + this.y + ']');
  }
}
