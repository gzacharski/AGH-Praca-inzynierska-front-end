import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Assignment as AssignmentIcon,
   Group as GroupIcon,
   NotificationsNone as NotificationsNoneIcon,
   Home as HomeIcon,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectDrawer } from 'src/main/store/sliceFiles/drawerSlice';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

export default function TrainerList() {
   const menuIsOpen = useSelector(selectDrawer);
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
            buttonName="Strona główna"
            CustomIcon={HomeIcon}
            pushUrl="/trainer"
            secondaryText="Plan zajęć w aktualnym tygodniu"
         />
         <CustomListItem
            buttonName="Zajęcia"
            CustomIcon={GroupIcon}
            pushUrl="/trainer/workouts"
            secondaryText="Plan zajęć w aktualnym tygodniu"
         />
         <CustomListItem
            buttonName="Powiadomienia"
            CustomIcon={NotificationsNoneIcon}
            pushUrl="/trainer/notifications"
            secondaryText="Akceptuj lub odrzuć zapytania o trening"
         />
         <CustomListItem
            buttonName="Zadania"
            CustomIcon={AssignmentIcon}
            pushUrl="/trainer/tasks"
            secondaryText="Moje zadania do wykonania"
         />
      </List>
   );
}
