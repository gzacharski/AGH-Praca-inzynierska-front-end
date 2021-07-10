import React, { useState } from 'react';
import {
   Collapse,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   makeStyles,
   Tooltip,
} from '@material-ui/core';
import {
   AccountCircle,
   Mail,
   Timeline,
   Settings,
   ExpandLess,
   ExpandMore,
   NotificationsNone,
} from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';
import {
   selectDrawer,
   toggleDrawer,
} from 'src/main/store/sliceFiles/drawerSlice';
import { selectUserInfo } from 'src/main/store/sliceFiles/accountSlice';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
   },
   nested: {
      paddingLeft: theme.spacing(4),
   },
}));

const AccountList = (props) => {
   const classes = useStyles();
   const [open, setOpen] = useState(false);

   const handleClick = () => {
      setOpen(!open);
   };

   const dispatch = useDispatch();
   const menuIsOpen = useSelector(selectDrawer);
   const user = useSelector(selectUserInfo);

   const { name, surname } = user;
   return (
      <List component="div" aria-labelledby="nested-list-subheader">
         <CustomListItem
            buttonName="Moje konto"
            CustomIcon={AccountCircle}
            pushUrl="/account"
            secondaryText={name && surname && `${name} ${surname}`}
         />
         <Tooltip
            title="Rezerwacje"
            arrow
            placement="right"
            disableFocusListener={menuIsOpen}
            disableHoverListener={menuIsOpen}
            disableTouchListener={menuIsOpen}
         >
            <ListItem
               button
               onClick={() => {
                  handleClick();
                  if (!menuIsOpen) dispatch(toggleDrawer());
               }}
            >
               <ListItemIcon>
                  <ListIcon />
               </ListItemIcon>
               <ListItemText primary="Rezerwacje" />
               {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
         </Tooltip>
         <Collapse in={menuIsOpen && open} timeout="auto" unmountOnExit>
            <List
               component="div"
               disablePadding
               onClick={() =>
                  props.history.push('/account/reservations/workouts/group')
               }
            >
               <ListItem button className={classes.nested}>
                  <ListItemText primary="Zajęć grupowych" />
               </ListItem>
            </List>
            <List
               component="div"
               disablePadding
               onClick={() =>
                  props.history.push(
                     '/account/reservations/workouts/individual',
                  )
               }
            >
               <ListItem button className={classes.nested}>
                  <ListItemText primary="Zajęć indywidualnych" />
               </ListItem>
            </List>
            <List
               component="div"
               disablePadding
               onClick={() =>
                  props.history.push('/account/reservations/equipment')
               }
            >
               <ListItem button className={classes.nested}>
                  <ListItemText primary="Sprzętu" />
               </ListItem>
            </List>
         </Collapse>
         <CustomListItem
            buttonName="Wiadomości"
            CustomIcon={Mail}
            pushUrl="/account/messages"
         />
         <CustomListItem
            buttonName="Powiadomienia"
            CustomIcon={NotificationsNone}
            pushUrl="/account/notifications"
         />
         <CustomListItem
            buttonName="Statystyki"
            CustomIcon={Timeline}
            pushUrl="/account/stats"
            secondaryText="Twoja aktywność w klubie"
         />
         <CustomListItem
            buttonName="Ustawienia"
            CustomIcon={Settings}
            pushUrl="/account/settings"
            secondaryText="Zmień ustawienia swojego konta"
         />
      </List>
   );
};

export default withRouter(AccountList);
