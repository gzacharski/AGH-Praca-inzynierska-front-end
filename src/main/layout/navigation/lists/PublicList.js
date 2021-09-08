import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Group,
   FitnessCenter,
   Event,
   Payment,
   EmojiPeople,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectDrawer } from 'src/main/store/sliceFiles/drawerSlice';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

export default function AdminList() {
   const menuIsOpen = useSelector(selectDrawer);
   return (
      <List
         component="div"
         aria-labelledby="nested-list-subheader"
         subheader={
            menuIsOpen && (
               <ListSubheader component="div" disableSticky>
                  Oferta siłowni
               </ListSubheader>
            )
         }
      >
         <CustomListItem
            buttonName="Zajęcia"
            CustomIcon={Group}
            menuIsOpen={menuIsOpen}
            pushUrl="/workouts"
            secondaryText="Zobacz ofertę zajęć w klubie"
         />
         <CustomListItem
            buttonName="Sprzęt"
            CustomIcon={FitnessCenter}
            menuIsOpen={menuIsOpen}
            pushUrl="/equipment"
            secondaryText="Zobacz ofertę sprzętu w klubie"
         />
         <CustomListItem
            buttonName="Trenerzy"
            CustomIcon={EmojiPeople}
            menuIsOpen={menuIsOpen}
            pushUrl="/trainers"
            secondaryText="Zobacz naszych trenerów i ich ofertę"
         />
         <CustomListItem
            buttonName="Grafik zajęć"
            CustomIcon={Event}
            menuIsOpen={menuIsOpen}
            pushUrl="/timetable"
            secondaryText="Zobacz aktualny rozkład jazdy i zarezerwuj sobie udział w zajęciach"
         />
         <CustomListItem
            buttonName="Cennik"
            CustomIcon={Payment}
            menuIsOpen={menuIsOpen}
            pushUrl="/price-list"
            secondaryText="Dobierz karnet do Twoich potrzeb"
         />
      </List>
   );
}
