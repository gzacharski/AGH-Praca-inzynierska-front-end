import React from 'react';
import {
   ListItem,
   ListItemIcon,
   ListItemText,
   Tooltip,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectDrawer, selectDrawerMoreInfo } from 'src/main/store/selectors';
import { withRouter } from 'react-router-dom';

const CustomListItem = (props) => {
   const menuIsOpen = useSelector(selectDrawer);
   const menuMoreInfo = useSelector(selectDrawerMoreInfo);

   const { buttonName, CustomIcon, pushUrl, secondaryText } = props;
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
               secondary={menuMoreInfo && menuIsOpen ? secondaryText : null}
               secondaryTypographyProps={{
                  color: 'textSecondary',
               }}
            />
         </ListItem>
      </Tooltip>
   );
};

export default withRouter(CustomListItem);
