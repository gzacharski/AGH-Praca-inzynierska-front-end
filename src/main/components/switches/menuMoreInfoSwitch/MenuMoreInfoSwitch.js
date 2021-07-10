import React from 'react';
import { Switch, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
   selectDrawer,
   selectDrawerMoreInfo,
   toggleDrawerMoreInfo
} from 'src/main/store/sliceFiles/drawerSlice';
import { useStyles } from './MenuMoreInfoSwitch.styles';

export default function MenuMoreInfoSwitch() {
   const dispatch = useDispatch();
   const menuIsOpen = useSelector(selectDrawer);
   const menuMoreInfo = useSelector(selectDrawerMoreInfo);
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
               onClick={() => dispatch(toggleDrawerMoreInfo())}
            />
         </Tooltip>
      )
   );
}
