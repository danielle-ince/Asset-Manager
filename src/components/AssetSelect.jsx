import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

export default function AssetIcon(props) {
  const { state } = props;

  const renderIcon = (state) => {
    switch(state) {
      case 'SELECTED':
        return(<CheckBoxIcon fontSize="small" />);
      case 'INDETERMINATE':
        return(<IndeterminateCheckBoxIcon fontSize="small" />);
      default:
        return (<CheckBoxOutlineBlankIcon fontSize="small" />);
    }
  }

  return (
    <>
      {renderIcon(state)}
    </>
  );
}