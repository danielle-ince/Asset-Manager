import * as Module from './asset-node';
import * as R from 'ramda';

describe('fixture/asset-node', () => {
  const { AssetNodeKind } = Module;

  describe('nextID', () => {
    const { nextID } = Module

    it('returns sequential ids', () => {
      const first = nextID();
      const second = nextID();

      expect(second).toEqual(first + 1);
    });
  });

  describe('createAssetNode', () => {
    const { createAssetNode } = Module

    it('creates an asset node fixture', () => {
      expect(createAssetNode())
        .toEqual(expect.objectContaining({
          id: expect.any(Number),
          kind: expect.any(String),
          location: expect.any(String),
          name: expect.any(String),
          parent_id: undefined,
          type: expect.any(String),
          website_id: expect.any(Number),
        }));
    });

    it('allows for making adjustments', () => {
      expect(createAssetNode({
          parent_id: 2,
          website_id: 9,
        }))
        .toEqual(expect.objectContaining({
          parent_id: 2,
          website_id: 9,
        }));
    });
  });

  describe('createAssetNodes', () => {
    const { createAssetNodes } = Module

    const nodes = createAssetNodes();

    it('creates some root files', () => {
      const files = R.filter(R.propEq('kind', AssetNodeKind.File));

      expect(files.length).toBeGreaterThan(0);
    });

    it('creates some root folders', () => {
      const folders = R.filter(R.propEq('kind', AssetNodeKind.Folder));

      expect(folders.length).toBeGreaterThan(0);
    });

    it('folders have some children', () => {
      const folders = R.filter(R.propEq('kind', AssetNodeKind.Folder), nodes);

      const first = R.head(folders);

      expect(first.children.length).toBeGreaterThan(0);
    });
  });
});
