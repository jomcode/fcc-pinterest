const expect = require('chai').expect;

const sanityCheck = process.env.SANITY === 'enabled' ?
  describe :
  describe.skip;

sanityCheck('sanity test', () => {
  it('works', () => {
    expect(true).to.equal(true);
  });
});
