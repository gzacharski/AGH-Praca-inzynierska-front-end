import React from 'react';
import {
   List,
   ListSubheader,
   Tooltip,
   ListItem,
   ListItemIcon,
   ListItemText,
} from '@material-ui/core';
import {
   Fingerprint,
   BubbleChart,
   Cloud,
   SupervisorAccount,
   EventSeat,
} from '@material-ui/icons';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
   selectDrawer,
   selectDrawerMoreInfo,
} from 'src/main/store/sliceFiles/drawerSlice';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const AdminList = () => {
   const menuIsOpen = useSelector(selectDrawer);

   const menuMoreInfo = useSelector(selectDrawerMoreInfo);

   return (
      <List
         component="div"
         aria-labelledby="nested-list-subheader"
         subheader={
            menuIsOpen && (
               <ListSubheader component="div" disableSticky>
                  Administrator
               </ListSubheader>
            )
         }
      >
         <Tooltip
            title="Logi"
            arrow
            placement="right"
            disableFocusListener={menuIsOpen}
            disableHoverListener={menuIsOpen}
            disableTouchListener={menuIsOpen}
         >
            <Link
               to={{ pathname: 'http://localhost:5601' }}
               target="_blank"
               style={{ textDecoration: 'none', color: 'inherit' }}
            >
               <ListItem button>
                  <ListItemIcon>
                     <Fingerprint />
                  </ListItemIcon>
                  <ListItemText
                     primary="Logi"
                     secondary={
                        menuMoreInfo && menuIsOpen
                           ? 'Informacje z poszczególnych serwisów'
                           : null
                     }
                     secondaryTypographyProps={{
                        color: 'textSecondary',
                     }}
                  />
               </ListItem>
            </Link>
         </Tooltip>
         <CustomListItem
            buttonName="Statystyki"
            CustomIcon={BubbleChart}
            pushUrl="/admin/stats"
            secondaryText="Monitoruj aktywność użytkowników"
         />
         <CustomListItem
            buttonName="Użytkownicy"
            CustomIcon={SupervisorAccount}
            pushUrl="/admin/users"
            secondaryText="Rejestr użytkowników w systemie"
         />
         <CustomListItem
            buttonName="Sprzęt"
            CustomIcon={EventSeat}
            pushUrl="/admin/equipment"
            secondaryText="Rejestr sprzętu w systemie"
         />
         <CustomListItem
            buttonName="Zarządzaj"
            CustomIcon={Cloud}
            pushUrl="/admin/manage"
            secondaryText="Zarządzaj mikroserwisami"
         />
      </List>
   );
};

export default withRouter(AdminList);
