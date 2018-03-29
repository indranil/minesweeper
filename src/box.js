// bomb is -1
// not bomb is 1

export default class Box {
  constructor(x, y, gameObj, type = 1, revealed = false) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.revealed = revealed;
    this.gameObj = gameObj;
    this.adjacent = 0;
    this.flagged = false;
    this.domElement = document.createElement('div');

    this.clicked = this.clicked.bind(this);
    this.rightClicked = this.rightClicked.bind(this);

    this.domElement.addEventListener('click', this.clicked);
    this.domElement.addEventListener('contextmenu', this.rightClicked);
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
  
  clicked(e) {
    e.preventDefault();
    this.gameObj.startTimer();
    
    this.reveal();

    if (this.isBomb()) {
      this.domElement.classList.add('clickedbomb');
      this.gameObj.gameOver();
    } else if (this.isEmptyAround()) {
      this.gameObj.flowReveal(this.x, this.y);
    }
  }

  rightClicked(e) {
    e.preventDefault();
    this.gameObj.startTimer();

    this.flag();
    
    if (!this.revealed) {
      let mLeft = this.isFlagged() ? this.gameObj.state.minesLeft - 1 : this.gameObj.state.minesLeft + 1;
      if (mLeft < 0) {
        mLeft = 0;
      }
      this.gameObj.setState('minesLeft', mLeft);
      this.gameObj.scoreDom.innerText = (''+this.gameObj.state.minesLeft).padStart(3, '0');
    }
  }

  flag() {
    if (!this.revealed) {
      this.flagged = !this.flagged;
      this.domElement.innerText = this.flagged ? '🚩' : '';
    }
  }
  
  isFlagged() {
    return this.flagged;
  }
  
  reveal() {
    this.flagged = false;
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
