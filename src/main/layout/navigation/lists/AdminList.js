import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Fingerprint,
   BubbleChart,
   Cloud,
   FileCopy,
   SupervisorAccount,
   PermDataSetting,
   Home,
   EventSeat,
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDrawer } from 'src/main/store/sliceFiles/drawerSlice';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const AdminList = () => {
   const menuIsOpen = useSelector(selectDrawer);
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
         <CustomListItem
            buttonName="Strona główna"
            CustomIcon={Home}
            pushUrl="/admin"
            secondaryText="Główny panel administratora"
         />
         <CustomListItem
            buttonName="Logi"
            CustomIcon={Fingerprint}
            pushUrl="/admin/logs"
            secondaryText="Informacje z poszczególnych serwisów"
         />
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
         <CustomListItem
            buttonName="Kopia zapasowa"
            CustomIcon={FileCopy}
            pushUrl="/admin/backup"
            secondaryText="Zarządzaj kopią zapasową"
         />
         <CustomListItem
            buttonName="Konfiguruj"
            CustomIcon={PermDataSetting}
            pushUrl="/admin/configure"
            secondaryText="Konfiguruj ustawienia systemu"
         />
      </List>
   );
};

export default withRouter(AdminList);
