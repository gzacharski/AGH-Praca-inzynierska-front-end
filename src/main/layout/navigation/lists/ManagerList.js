import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
   List,
   ListSubheader,
   Tooltip,
   ListItem,
   ListItemIcon,
   ListItemText,
   Collapse,
   makeStyles,
} from '@material-ui/core';
import {
   Assignment,
   AttachMoney,
   EventNote,
   EventSeat,
   SupervisorAccount,
   ExpandLess as ExpandLessIcon,
   ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import {
   selectDrawer,
   toggleDrawer,
} from 'src/main/store/sliceFiles/drawerSlice';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';

const useStyles = makeStyles((theme) => ({
   nested: {
      paddingLeft: theme.spacing(4),
   },
}));

export default function ManagerList() {
   const classes = useStyles();
   const menuIsOpen = useSelector(selectDrawer);
   const history = useHistory();
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(!open);
   };
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
         <Tooltip title="Zadania" arrow placement="right">
            <ListItem
               button
               onClick={() => {
                  handleClick();
                  if (!menuIsOpen) dispatch(toggleDrawer());
               }}
            >
               <ListItemIcon>
                  <Assignment />
               </ListItemIcon>
               <ListItemText primary="Zadania" />
               {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
         </Tooltip>
         <Collapse in={menuIsOpen && open} timeout="auto" unmountOnExit>
            <List
               component="div"
               disablePadding
               onClick={() => history.push('/manager/tasks')}
            >
               <ListItem button className={classes.nested}>
                  <ListItemText primary="Zadania pracowników" />
               </ListItem>
            </List>
            <List
               component="div"
               disablePadding
               onClick={() => history.push('/manager/tasks/add')}
            >
               <ListItem button className={classes.nested}>
                  <ListItemText primary="Dodaj zadanie" />
               </ListItem>
            </List>
         </Collapse>
         <CustomListItem
            buttonName="Modyfikuj grafik"
            CustomIcon={EventNote}
            pushUrl="/manager/timetable"
            secondaryText="Zmień aktualne godziny zajęć"
         />
         <CustomListItem
            buttonName="Modyfikuj ofertę"
            CustomIcon={AttachMoney}
            pushUrl="/manager/pricelist"
            secondaryText="Dodaj, modyfikuj lub usuń"
         />
         <CustomListItem
            buttonName="Sprzęt"
            CustomIcon={EventSeat}
            pushUrl="/manager/equipment"
            secondaryText="Rejestr sprzętu w systemie"
         />
         <CustomListItem
            buttonName="Użytkownicy"
            CustomIcon={SupervisorAccount}
            pushUrl="/manager/users"
            secondaryText="Rejestr użytkowników w systemie"
         />
      </List>
   );
}
