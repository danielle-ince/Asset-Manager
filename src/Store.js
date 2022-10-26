import { RootStore } from './models/RootStore';
import { getMocks } from './fixture/api';

export const Store = RootStore.create({
  assets: {}
});

const initStore = async () => {
  const content = await getMocks();
  console.log(content)

  content.forEach(asset => {
    initAsset(asset, 0);
  });
}

const initAsset = (asset, level) => {
  console.log(asset)

  Store.addAsset(asset.id, asset.name, asset.type, asset.kind, level, false);
  const [ newAsset ] = Store.getAsset(asset.id);
  newAsset.setParent(asset.parent_id);
  level++;

  if (asset.children) {
    asset.children.forEach(child => {
      newAsset.addChild(child.id)
      initAsset(child, level);
    });
  }
}

initStore();
