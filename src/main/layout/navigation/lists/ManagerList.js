import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Assignment,
   AttachMoney,
   EventNote,
   EventSeat,
   SupervisorAccount,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const ManagerList = (props) => {
   const { menuIsOpen } = props;
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
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(ManagerList);
