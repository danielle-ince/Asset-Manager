import AssetSelect from './AssetSelect';
import AssetIcon from './AssetIcon';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { observer } from "mobx-react";


const Asset = observer(( { asset }) => {

  return (
    <div className={`Asset Asset__container`}>
      <div className="Asset__move">
        <DragIndicatorIcon sx={{ color: '#e5e5e5' }} />
      </div>
      <div className="Asset__content-wrap" style={{ marginLeft: asset.getLevel * 20 }}>
        <button type="button" className="Asset__select" onClick={() => asset.toggleSelected()}>
          <AssetSelect state={asset.getSelected} />
        </button>
        <AssetIcon type={asset.getKind} expandState={asset.getExpanded} />
        <div className={`${asset.getKind === 'File' ? 'Asset__name--file' : 'Asset__name--folder' }`} onClick={() => asset.toggleExpanded()}>
          {asset.getName}{asset.getKind === 'File' ? `.${asset.getType}` : '' }
        </div>
      </div>
    </div>
  )
});

export default Asset;