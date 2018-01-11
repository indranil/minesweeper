import { expect } from 'chai';

describe('smoke test', function() {
  it('runs the test', function() {
    expect(42).to.be.a('Number').and.equal(42);
    expect(false).to.be.false;
  });
});
