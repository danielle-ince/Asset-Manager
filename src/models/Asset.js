import { types } from "mobx-state-tree";
import { observer } from "mobx-react";

export const Asset = types
  .model({
    id: types.identifierNumber,
    parent: types.maybe(types.reference(types.late(() => Asset))),
    children: types.maybe(types.array(types.reference(types.late(() => Asset)))),
    name: types.optional(types.string, ""),
    type: types.string,
    kind: types.string,
    level: types.number,
    expanded: types.boolean,
    selected: types.enumeration('selected', ['UNSELECTED', 'INDETERMINATE', 'SELECTED']),
  })
  .views(self => ({
    get getName() {
      return self.name
    },
    get getKind() {
      return self.kind
    },
    get getType() {
      return self.type
    },
    get getLevel() {
      return self.level
    },
    get getSelected() {
     return self.selected 
    },
    get getExpanded() {
      return self.expanded
    },
    get getParent() {
      return self.parent
    }
  }))
  .actions(self => {

    function setParent(parent) {
      self.parent = parent;
    }

    function addChild(child) {
      self.children.push(child);
    }

    function toggleSelected() {
      if (self.selected === 'SELECTED') {
        self.selected = 'UNSELECTED';
      } else {
        self.selected = 'SELECTED';
      }

      updateChildSelected(self.selected);
      if (self.parent) {
        self.parent.setSelectedFromChildren();
      }

    }

    function setSelected(select) {
      self.selected = select;
      updateChildSelected(select);
    }

    function parentOverride(select) {
      self.selected = select;
      if(self.parent) {
        self.parent.setSelectedFromChildren();
      }
    }

    function updateChildSelected(select) {
      self.children.forEach((child) => {
        child.setSelected(select);
      });
    }

    function setSelectedFromChildren() {
      const numSelected = self.children.filter((child) => child.selected === 'SELECTED').length;
      const numIndeterminate = self.children.filter((child) => child.selected === 'INDETERMINATE').length;

      if (numSelected === self.children.length) {
        parentOverride('SELECTED');
      } else if (numSelected + numIndeterminate > 0) {
        parentOverride('INDETERMINATE');
      } else {
        parentOverride('UNSELECTED')
      }
    }

    function toggleExpanded() {
      self.expanded = !self.expanded;

      if (!self.expanded) {
        handleRecursiveExpanded(self.expanded);
      }
    }

    function handleRecursiveExpanded(expanded) {
      self.expanded = expanded;

      self.children.forEach((child) => {
        child.handleRecursiveExpanded(expanded)
      })
    }

    return { setParent, addChild, toggleSelected, setSelected, parentOverride, updateChildSelected, setSelectedFromChildren, toggleExpanded, handleRecursiveExpanded };
  });

export const AssetCounterView = observer(props => (
  <div>
      {props.store.selectedCount} selected, {props.store.count} total
  </div>
))

