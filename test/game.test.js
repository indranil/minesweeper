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
  describe('plantMines()', function(done) {
    it('plants mines', function() {
      let game = new Game(1, 1, 1);
      game.setupGrid();
      game.plantMines();
      expect(game.grid[0][0].type).to.equal(-1);
    });
  });
});
