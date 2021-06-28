import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import { Assignment, AttachMoney, EventNote } from '@material-ui/icons';
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
                  Menager
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
            pushUrl="/account/manager/tasks"
            secondaryText="Zmień aktualne godziny zajęć"
         />
         <CustomListItem
            buttonName="Modyfikuj ofertę"
            CustomIcon={AttachMoney}
            pushUrl="/account/manager/tasks"
            secondaryText="Dodaj, modyfikuj lub usuń"
         />
      </List>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(ManagerList);
