import React from 'react';
import { List, ListSubheader } from '@material-ui/core';
import { Assignment, Group } from '@material-ui/icons';
import { connect } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const TrainerList = (props) => {
   const { menuIsOpen } = props;
   return (
      <List
         component="nav"
         aria-labelledby="nested-list-subheader"
         subheader={
            menuIsOpen && (
               <ListSubheader component="div" disableSticky>
                  Trener
               </ListSubheader>
            )
         }
      >
         <CustomListItem buttonName="Zajęcia" CustomIcon={Group} />
         <CustomListItem buttonName="Zadania" CustomIcon={Assignment} />
      </List>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

export default connect(mapStateToProps, null)(TrainerList);
