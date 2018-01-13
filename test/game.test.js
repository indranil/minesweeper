import { expect } from 'chai';
import Game from '../src/game';

describe('Game()', function() {
  it('returns an object', function() {
    let game = new Game();
    expect(game).to.be.an('object');
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
});
