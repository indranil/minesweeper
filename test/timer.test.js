import { expect } from 'chai';
import Timer from '../src/timer';

describe('Timer()', function() {
  describe('start()', function() {
    it('should set started flag on timer', function() {
      const timer = new Timer(document.createElement('div'));
      timer.start();
      expect(timer.started).to.be.true;
      clearInterval(timer.timerDraw);
    });
  });
  describe('elapsed()', function() {
    it('should have an elapsed time', function(done) {
      this.timeout(3000);
      const timer = new Timer(document.createElement('div'));
      timer.start();
      setTimeout(() => {
        if (timer.elapsed() >= 2) {
          clearInterval(timer.timerDraw);
          done();
        } else {
          clearInterval(timer.timerDraw);
          done(new Error);
        }
      }, 2100);
      clearInterval(timer.timerDraw);
    });
  });
  describe('stop()', function() {
    it('should stop the timer', function() {
      const timer = new Timer(document.createElement('div'));
      timer.start();
      expect(timer.running).to.be.true;
      timer.stop();
      expect(timer.running).to.be.false;
      clearInterval(timer.timerDraw);
    });
  });
});
