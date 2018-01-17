export default class Timer {
  constructor(domElement) {
    this.time;
    this.previousTime;
    this.elapsedTime;
    this.domElement = domElement;
    this.started = false;
    this.running = false;
    
    this.timerDraw;
    this.domElement.innerText = '000';
  }
  
  start() {
    this.started = true;
    this.running = true;
    this.elapsedTime = 0;
    this.previousTime = Date.now();
    this.draw();
  }
  
  elapsed() {
    if (this.running && this.started) {
      let now = Date.now();
      this.elapsedTime = now - this.previousTime;
    }
    return Math.floor(this.elapsedTime / 1000);
  }
  
  stop() {
    this.running = false;
    window.clearInterval(this.timerDraw);
  }
  
  reset() {
    this.elapsedTime = 0;
    this.previousTime = 0;
    this.started = false;
    this.running = false;
  }
  
  draw() {
    this.timerDraw = setInterval(() => {
      this.domElement.innerText = (''+this.elapsed()).padStart(3, '0');
    }, 1000);
  }
}
