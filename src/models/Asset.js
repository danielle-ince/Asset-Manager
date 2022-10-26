import { types } from "mobx-state-tree";
import { observer } from "mobx-react";
import AssetComponent from '../components/Asset';

import AssetSelect from '../components/AssetSelect';
import AssetIcon from '../components/AssetIcon';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

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
    get getSelected() {
      return self.selected.SELECTED
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


export const AssetView = observer((props) => {
  return (
    <div className={`Asset Asset__container ${!props.asset.parent || props.asset.parent.expanded ? '' : 'hidden'} `}>
      <div className="Asset__move">
        <DragIndicatorIcon sx={{ color: '#e5e5e5' }} />
      </div>
      <div className="Asset__content-wrap" style={{ marginLeft: props.asset.level * 20 }}>
        <button type="button" className="Asset__select">
          <AssetSelect state="" />
        </button>
        <AssetIcon type={props.asset.kind} expandState={props.asset.expanded} />
        <div className="Asset__name" onClick={() => props.asset.toggleExpanded()}>
          {props.asset.name}.{props.asset.type}
        </div>
      </div>
    </div>
  )});

export const AssetCounterView = observer(props => (
  <div>
      {props.store.pendingCount} pending, {props.store.completedCount} completed
  </div>
))

