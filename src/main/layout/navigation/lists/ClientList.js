import React from 'react';
import {
   Collapse,
   List,
   ListItem,
   ListItemIcon,
   ListSubheader,
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
} from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';
import { connect } from 'react-redux';
import CustomListItem from 'src/main/layout/navigation/listItem/CustomListItem';
import { toggleDrawer } from 'src/main/store/state/action/creators';

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

const ClientList = (props) => {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);

   const handleClick = () => {
      setOpen(!open);
   };

   const { menuIsOpen, toggle } = props;
   return (
      <List
         component="nav"
         aria-labelledby="nested-list-subheader"
         subheader={
            menuIsOpen && (
               <ListSubheader component="div" disableSticky>
                  Krzysztof Kowalski
               </ListSubheader>
            )
         }
      >
         <CustomListItem buttonName="Moje konto" CustomIcon={AccountCircle} />
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
                  if (!menuIsOpen) toggle();
                  console.log('Rezerwacje');
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
               onClick={() => console.log('Rezerwacje zajęć grupowych')}
            >
               <ListItem button className={classes.nested}>
                  <ListItemText primary="Zajęć grupowych" />
               </ListItem>
            </List>
            <List
               component="div"
               disablePadding
               onClick={() => console.log('Rezerwacje zajęć indywidualnych')}
            >
               <ListItem button className={classes.nested}>
                  <ListItemText primary="Zajęć indywidualnych" />
               </ListItem>
            </List>
            <List
               component="div"
               disablePadding
               onClick={() => console.log('Rezerwacje sprzętu')}
            >
               <ListItem button className={classes.nested}>
                  <ListItemText primary="Sprzętu" />
               </ListItem>
            </List>
         </Collapse>
         <CustomListItem buttonName="Wiadomości" CustomIcon={Mail} />
         <CustomListItem buttonName="Statystyki" CustomIcon={Timeline} />
         <CustomListItem buttonName="Ustawienia" CustomIcon={Settings} />
      </List>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

const mapDispatchToProps = { toggle: toggleDrawer };

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
