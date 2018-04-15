import { expect } from 'chai';
import Game from '../src/game';
import Timer from '../src/timer';

describe('Game()', function() {
  it('returns an object', function() {
    let game = new Game();
    expect(game).to.be.an('object');
  });
  describe('setState()', function() {
    it('sets a state value', function() {
      const game = new Game(2, 2, 2);
      expect(game.state.minesLeft).to.equal(2);
      game.setState('minesLeft', 4);
      expect(game.state.minesLeft).to.equal(4);      
    });
  });
  describe('validate', function() {
    it('validates correctly', function() {
      const game = new Game(2, 2, 5);
      expect(game.numMines).to.equal(3);
    });
  });
  describe('setupGrid()', function() {
    it('should instantiate grid', function() {
      let game = new Game(21, 2, 2);
      game.setupGrid();
      expect(game.grid).to.be.an('array');
    });
    it('should fills grids with Boxes', function() {
      let game = new Game(2, 2, 2);
      game.setupGrid();
      expect(game.grid[1][1]).to.be.an('object').and.have.property('type');
    });
  });
  describe('plantMines()', function() {
    it('plants mines', function() {
      let game = new Game(1, 1, 1);
      game.setupGrid();
      game.plantMines();
      expect(game.grid[0][0].type).to.equal(-1);
    });
    it('also increments the adjacent value', function() {
      let game = new Game(1, 2, 1);
      game.setupGrid();
      game.plantMines();
      if (game.grid[0][0].isBomb()) {
        expect(game.grid[0][1].adjacent).to.equal(1);
      }
      if (game.grid[0][1].isBomb()) {
        expect(game.grid[0][0].adjacent).to.equal(1);
      }
    });
  });
  describe('getAdjacentBoxes()', function() {
    it('should return an array of 8 length', function() {
      let game = new Game(5, 5, 1);
      game.setupGrid();
      game.plantMines();
      let adjacentBoxes = game.getAdjacentBoxes(2, 2);
      expect(adjacentBoxes).to.be.an('array').and.have.length(8);
    });
  });
  describe('startTimer()', function() {
    it('correctly starts the timer', function() {
      const timer = new Timer(document.createElement('div'));
      const game = new Game(1, 2, 1, timer);
      game.startTimer();
      expect(timer.started).to.be.true;
      clearInterval(timer.timerDraw);
    });
  });
  describe('reset()', function() {
    it('resets the timer', function() {
      const timer = new Timer(document.createElement('div'));
      const game = new Game(1, 2, 1, timer, document.createElement('div'), document.createElement('span'));
      game.startTimer();
      expect(timer.started).to.be.true;
      game.reset();
      expect(timer.started).to.be.false;
      clearInterval(timer.timerDraw);
    });
  });
});
