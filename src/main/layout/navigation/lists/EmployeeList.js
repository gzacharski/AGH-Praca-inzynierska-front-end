import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import { Assignment, SupervisorAccount, EventSeat } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectDrawer } from 'src/main/store/selectors';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

export default function ReceptionEmployeeList() {
   const menuIsOpen = useSelector(selectDrawer);
   return (
      <List
         component="div"
         aria-labelledby="nested-list-subheader"
         subheader={
            menuIsOpen && (
               <ListSubheader component="div" disableSticky>
                  Pracownik
               </ListSubheader>
            )
         }
      >
         <CustomListItem
            buttonName="Użytkownicy"
            CustomIcon={SupervisorAccount}
            pushUrl="/account/employee/users"
            secondaryText="Rejestr użytkowników w systemie"
         />
         <CustomListItem
            buttonName="Sprzęt"
            CustomIcon={EventSeat}
            pushUrl="/account/employee/equipment"
            secondaryText="Rejestr sprzętu w systemie"
         />
         <CustomListItem
            buttonName="Zadania"
            CustomIcon={Assignment}
            pushUrl="/account/employee/tasks"
            secondaryText="Moje zadania do wykonania"
         />
      </List>
   );
}
