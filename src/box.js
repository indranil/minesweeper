// bomb is -1
// not bomb is 1

export default class Box {
  constructor(type, revealed) {
    this.valid = true;
    if (type === undefined) {
      this.valid = false;
    }
    this.type = type;
    this.revealed = revealed;
  }
  
  reveal() {
    this.revealed = true;
  }
}
