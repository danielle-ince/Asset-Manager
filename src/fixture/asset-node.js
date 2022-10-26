import * as R from 'ramda';
import Chance from 'chance';

const chance = new Chance();

export const AssetNodeKind = {
  File: 'File',
  Folder: 'Folder',
};

const AssetNodeKinds = Object.values(AssetNodeKind);
const FileTypes = ['gif', 'jpg', 'png', 'pdf'];

/**
 * Stateful sequential id generator.
 */
export function nextID() {
  nextID.value = nextID.value || 0;

  return ++nextID.value;
}

/**
 * Create a mock asset node.
 */
export function createAssetNode(adjustments = {}) {
  const type = chance.pickone(FileTypes);

  return {
    id: nextID(),
    kind: chance.pickone(AssetNodeKinds),
    location: chance.url({ extensions: [type] }),
    name: chance.word({ syllables: 5 }),
    parent_id: undefined,
    type,
    website_id: nextID(),
    ...adjustments,
  };
}

/**
 * Create an asset node tree.
 */
export function createAssetNodes({
  depth = 3,
  parent_id,
  website_id = nextID(),
} = {}) {
  const defaults = { parent_id, website_id };

  // Create files.
  const files = R.times(() => {
    return createAssetNode({
      kind: AssetNodeKind.File,
      ...defaults,
    });
  }, chance.natural({ min: 1, max: 3 }));

  // Create folders.
  const folders = R.times(() => {
    const id = nextID();

    const children = (depth === 0)
      ? []
      : createAssetNodes({ ...defaults, parent_id: id, depth: depth - 1 });

    return createAssetNode({
      children,
      id,
      kind: AssetNodeKind.Folder,
      ...defaults,
    });
  }, chance.natural({ min: 1, max: 3 }));

  return [...folders, ...files];
}
