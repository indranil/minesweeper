import { expect } from 'chai';
import { grid } from '../src/grid';

describe('grid()', function() {
  it('returns arrays of arrays', function() {
    let g = grid(3, 3);
    expect(g).to.be.an('Array');
    expect(g[0]).to.be.an('Array');
  });
  it('should return null on 0x0', function() {
    let g = grid(0,0);
    expect(g).to.be.a('null');
  });
  it('should return 1x1 grid if called without x and y', function() {
    let g = grid();
    expect(g).to.be.an('array').and.have.length(1);
    expect(g[0]).to.have.length(1);
  });
  it('should return the right sized map', function() {
    let g = grid(2, 2);
    expect(g).to.have.length(2);
    expect(g[1]).to.have.length(2);
  });
});
