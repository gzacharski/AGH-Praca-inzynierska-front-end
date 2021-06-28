import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import { Assignment, SupervisorAccount } from '@material-ui/icons';
import { connect } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const ReceptionEmployeeList = (props) => {
   const { menuIsOpen } = props;
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
            buttonName="Zadania"
            CustomIcon={Assignment}
            pushUrl="/account/employee/users"
            secondaryText="Rejestr użytkowników w systemie"
         />
      </List>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(ReceptionEmployeeList);