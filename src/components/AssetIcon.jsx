import { VscSymbolFile } from 'react-icons/vsc';
import { VscFolder } from 'react-icons/vsc';
import { VscFolderOpened } from 'react-icons/vsc';

const renderIcon = (state) => {
  switch(state) {
    case 'Folder-false':
      return(<VscFolder />);
      break;
    case 'Folder-true':
      return(<VscFolderOpened />);
      break;
    default:
      return (<VscSymbolFile />);
  }
}

export default function AssetIcon(props) {
  const { type, expandState } = props;
  let state = type;

  if (type === 'Folder') {
    state = `${type}-${expandState}`
  }
  
  return (
    <div className="Asset__icon">
      {renderIcon(state)}
    </div>
  );
}