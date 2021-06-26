import React from 'react';
import {
   ListItem,
   ListItemIcon,
   ListItemText,
   Tooltip,
} from '@material-ui/core';
import { connect } from 'react-redux';

const CustomListItem = (props) => {
   const { buttonName, CustomIcon, menuIsOpen } = props;
   return (
      <Tooltip
         title={buttonName}
         arrow
         placement="right"
         disableFocusListener={menuIsOpen}
         disableHoverListener={menuIsOpen}
         disableTouchListener={menuIsOpen}
      >
         <ListItem button>
            <ListItemIcon>
               <CustomIcon />
            </ListItemIcon>
            <ListItemText primary={buttonName} />
         </ListItem>
      </Tooltip>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(CustomListItem);
