import { expect } from 'chai';
import Box from '../src/box';

describe('Box()', function() {
  it('errors without a type', function() {
    let box = new Box();
    expect(box.valid).to.be.false;
  });
  it('instantiates', function() {
    let box = new Box(-1, false);
    expect(box.valid).to.be.true;
    expect(box).to.not.be.null;
  });
  it('returns right data type', function() {
    let box = new Box(-1, false);
    expect(box.type).to.equal(-1);
  });
  it('returns right reveal status', function() {
    let box = new Box(1, false);
    expect(box.revealed).to.be.false;
  });
  it('rightly reveals', function() {
    let box = new Box(1, false);
    box.reveal();
    expect(box.revealed).to.be.true;
  });
});
