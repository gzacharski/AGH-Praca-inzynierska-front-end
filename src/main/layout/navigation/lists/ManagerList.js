import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Assignment,
   AttachMoney,
   EventNote,
   EventSeat,
   SupervisorAccount,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectDrawer } from 'src/main/store/selectors';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

export default function ManagerList() {
   const menuIsOpen = useSelector(selectDrawer);
   return (
      <List
         component="div"
         aria-labelledby="nested-list-subheader"
         subheader={
            menuIsOpen && (
               <ListSubheader component="div" disableSticky>
                  Menadżer
               </ListSubheader>
            )
         }
      >
         <CustomListItem
            buttonName="Zadania pracowników"
            CustomIcon={Assignment}
            pushUrl="/account/manager/tasks"
            secondaryText="Zlecaj zadania i zarządzaj pracownikami"
         />
         <CustomListItem
            buttonName="Modyfikuj grafik"
            CustomIcon={EventNote}
            pushUrl="/account/manager/timetable"
            secondaryText="Zmień aktualne godziny zajęć"
         />
         <CustomListItem
            buttonName="Modyfikuj ofertę"
            CustomIcon={AttachMoney}
            pushUrl="/account/manager/pricelist"
            secondaryText="Dodaj, modyfikuj lub usuń"
         />
         <CustomListItem
            buttonName="Sprzęt"
            CustomIcon={EventSeat}
            pushUrl="/account/manager/equipment"
            secondaryText="Rejestr sprzętu w systemie"
         />
         <CustomListItem
            buttonName="Użytkownicy"
            CustomIcon={SupervisorAccount}
            pushUrl="/account/manager/users"
            secondaryText="Rejestr użytkowników w systemie"
         />
      </List>
   );
}
