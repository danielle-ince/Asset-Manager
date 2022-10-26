import React from "react";
import { observer } from "mobx-react";
import { values } from "mobx";
import { AssetView, AssetCounterView } from './models/Asset';
import AssetComponent from './components/Asset';

import './App.css';

export const AppView = observer(props => (
  <div className="AssetManager__container">
    <div className="AssetManager__header">

    </div>
    <div className="AssetManager__assets">
      <div>
        {values(props.store.assets)
          .filter(asset => {
            return asset.getParent === undefined || asset.getParent.expanded
          })
          .map(asset => (
            <AssetComponent key={asset.id} asset={asset} />
        ))}
        <AssetCounterView store={props.store} />
      </div>
    </div>
  </div>
));