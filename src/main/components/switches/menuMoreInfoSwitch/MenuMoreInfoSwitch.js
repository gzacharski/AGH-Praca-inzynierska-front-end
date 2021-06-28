import React from 'react';
import { connect } from 'react-redux';
import { Switch, Tooltip } from '@material-ui/core';
import { toggleMenuMoreInfo } from 'src/main/store/state/action/creators';
import { useStyles } from './MenuMoreInfoSwitch.styles';

const MenuMoreInfoSwitch = (props) => {
   const { toggleMoreInfo, menuIsOpen, menuMoreInfo } = props;
   const classes = useStyles();

   const tooltipText = menuMoreInfo
      ? 'Pokaż mniej informacji w menu'
      : 'Pokaż więcej informacji w menu';

   return (
      menuIsOpen && (
         <Tooltip title={tooltipText} arrow placement="right">
            <Switch
               checked={menuMoreInfo}
               className={classes.root}
               onClick={() => toggleMoreInfo()}
            />
         </Tooltip>
      )
   );
};

const mapStateToProps = (store) => ({
   menuIsOpen: store.stateData.menuIsOpen,
   menuMoreInfo: store.stateData.menuMoreInfo,
});

const mapDispatchToProps = {
   toggleMoreInfo: toggleMenuMoreInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuMoreInfoSwitch);
