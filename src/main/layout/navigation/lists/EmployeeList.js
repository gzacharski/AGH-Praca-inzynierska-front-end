import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Assignment as AssignmentIcon,
   SupervisorAccount as SupervisorAccountIcon,
   EventSeat as EventSeatIcon,
   Home as HomeIcon,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectDrawer } from 'src/main/store/sliceFiles/drawerSlice';
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
            buttonName="Strona główna"
            CustomIcon={HomeIcon}
            pushUrl="/account/employee"
         />
         <CustomListItem
            buttonName="Użytkownicy"
            CustomIcon={SupervisorAccountIcon}
            pushUrl="/account/employee/users"
            secondaryText="Rejestr użytkowników w systemie"
         />
         <CustomListItem
            buttonName="Sprzęt"
            CustomIcon={EventSeatIcon}
            pushUrl="/account/employee/equipment"
            secondaryText="Rejestr sprzętu w systemie"
         />
         <CustomListItem
            buttonName="Zadania"
            CustomIcon={AssignmentIcon}
            pushUrl="/account/employee/tasks"
            secondaryText="Moje zadania do wykonania"
         />
      </List>
   );
}
