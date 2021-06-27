import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import {
   Group,
   FitnessCenter,
   Settings,
   Event,
   ContactPhone,
   Payment,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const AdminList = (props) => {
   const { menuIsOpen } = props;
   return (
      <List
         component="nav"
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
         />
         <CustomListItem
            buttonName="Sprzęt"
            CustomIcon={FitnessCenter}
            menuIsOpen={menuIsOpen}
         />
         <CustomListItem
            buttonName="Trenerzy"
            CustomIcon={Settings}
            menuIsOpen={menuIsOpen}
         />
         <CustomListItem
            buttonName="Grafik zajęć"
            CustomIcon={Event}
            menuIsOpen={menuIsOpen}
         />
         <CustomListItem
            buttonName="Kontakt"
            CustomIcon={ContactPhone}
            menuIsOpen={menuIsOpen}
         />
         <CustomListItem
            buttonName="Cennik"
            CustomIcon={Payment}
            menuIsOpen={menuIsOpen}
         />
      </List>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(AdminList);
