import * as Module from './api';
import * as R from 'ramda';

describe('fixture/api', () => {
  const { AssetNodeKind } = Module;

  describe('find', () => {
    const { find } = Module

    it('returns root nodes without children', async () => {
      const results = await find();

      expect(
        R.all(R.complement(R.has)('children'), results)
      ).toBe(true);
    });
  });

  describe('create', () => {
    const { create } = Module

    it('returns a new node', async () => {
      const results = await create({ foo: 'bar' });

      expect(results).toHaveProperty('id');
    });
  });
});
