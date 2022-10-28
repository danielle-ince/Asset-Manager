import { types } from 'mobx-state-tree';
import { values } from "mobx";
import { Asset } from './Asset'

export const RootStore = types
.model({
  assets: types.map(Asset),
})
.views(self => ({
  get selectedCount() {
    return values(self.assets).filter(asset => asset.getSelected === 'SELECTED').length
  },
  get count() {
    return values(self.assets).length
  },
  getAsset(id) {
    return values(self.assets).filter(asset => asset.id === id);
  },
  getTodosWhereDoneIs(done) {
    return values(self.assets).filter(todo => todo.done === done)
  }
}))
.actions(self => ({
    addAsset(id, name, type, kind, level, expanded) {
      let newAsset = Asset.create({ 
        id: id,
        name: name, 
        type: type, 
        kind: kind,
        level: level,
        expanded: expanded,
        selected: 'UNSELECTED',
        children: []
      });
      self.assets.set(id, newAsset);
      return newAsset;
    }
}))