import React from 'react';
import {
   ListItem,
   ListItemIcon,
   ListItemText,
   Tooltip,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const CustomListItem = (props) => {
   const {
      buttonName,
      CustomIcon,
      menuIsOpen,
      pushUrl,
      menuMoreInfo,
      secondaryText,
   } = props;
   const handleClick = (history) => {
      if (pushUrl) history.push(pushUrl);
   };
   return (
      <Tooltip
         title={buttonName}
         arrow
         placement="right"
         disableFocusListener={menuIsOpen}
         disableHoverListener={menuIsOpen}
         disableTouchListener={menuIsOpen}
      >
         <ListItem button onClick={() => handleClick(props.history)}>
            <ListItemIcon>
               <CustomIcon />
            </ListItemIcon>
            <ListItemText
               primary={buttonName}
               secondary={menuMoreInfo ? secondaryText : null}
               secondaryTypographyProps={{
                  color: 'textSecondary',
               }}
            />
         </ListItem>
      </Tooltip>
   );
};

const mapStateToProps = (store) => ({
   menuIsOpen: store.stateData.menuIsOpen,
   menuMoreInfo: store.stateData.menuMoreInfo,
});

export default withRouter(connect(mapStateToProps, null)(CustomListItem));
