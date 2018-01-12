import { expect } from 'chai';
import Box from '../src/box';

describe('Box()', function() {
  it('without a type, it returns a not bomb, unrevealed', function() {
    let box = new Box();
    expect(box.type).to.equal(1);
    expect(box.revealed).to.be.false;
  });
  it('instantiates', function() {
    let box = new Box(-1, false);
    expect(box).to.be.an('object');
  });
  it('returns right data type', function() {
    let box = new Box(0, 0, -1);
    expect(box.type).to.equal(-1);
  });
  it('returns right reveal status', function() {
    let box = new Box(0, 0, 1, true);
    expect(box.revealed).to.be.true;
  });
  it('rightly reveals', function() {
    let box = new Box(0, 0, 1, false);
    box.reveal();
    expect(box.revealed).to.be.true;
  });
});
