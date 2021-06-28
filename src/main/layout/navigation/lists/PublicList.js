import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Group,
   FitnessCenter,
   Event,
   ContactPhone,
   Payment,
   EmojiPeople,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const AdminList = (props) => {
   const { menuIsOpen } = props;
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
         />
         <CustomListItem
            buttonName="Sprzęt"
            CustomIcon={FitnessCenter}
            menuIsOpen={menuIsOpen}
            pushUrl="/equipment"
         />
         <CustomListItem
            buttonName="Trenerzy"
            CustomIcon={EmojiPeople}
            menuIsOpen={menuIsOpen}
            pushUrl="/trainers"
         />
         <CustomListItem
            buttonName="Grafik zajęć"
            CustomIcon={Event}
            menuIsOpen={menuIsOpen}
            pushUrl="/timetable"
         />
         <CustomListItem
            buttonName="Kontakt"
            CustomIcon={ContactPhone}
            menuIsOpen={menuIsOpen}
            pushUrl="/contact"
         />
         <CustomListItem
            buttonName="Cennik"
            CustomIcon={Payment}
            menuIsOpen={menuIsOpen}
            pushUrl="/price-list"
         />
      </List>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(AdminList);
