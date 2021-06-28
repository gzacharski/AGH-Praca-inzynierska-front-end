import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import { Assignment, Group, NotificationsNone } from '@material-ui/icons';
import { connect } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const TrainerList = (props) => {
   const { menuIsOpen } = props;
   return (
      <List
         component="div"
         aria-labelledby="nested-list-subheader"
         subheader={
            menuIsOpen && (
               <ListSubheader component="div" disableSticky>
                  Trener
               </ListSubheader>
            )
         }
      >
         <CustomListItem
            buttonName="Zajęcia"
            CustomIcon={Group}
            pushUrl="/account/trainer/workouts"
            secondaryText="Plan zajęć w aktualnym tygodniu"
         />
         <CustomListItem
            buttonName="Powiadomienia"
            CustomIcon={NotificationsNone}
            pushUrl="/account/trainer/notifications"
            secondaryText="Akceptuj lub odrzuć zapytania o trening"
         />
         <CustomListItem
            buttonName="Zadania"
            CustomIcon={Assignment}
            pushUrl="/account/trainer/tasks"
            secondaryText="Moje zadania do wykonania"
         />
      </List>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(TrainerList);
