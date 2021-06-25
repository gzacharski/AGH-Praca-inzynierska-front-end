import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { NavLink, LoginButton } from 'src/main/components/buttons';
import { PersonalMenu } from 'src/main/components/buttonGroups';
import { toggleDrawer } from 'src/main/store/state/action/creators';
import { AuthContext } from 'src/main/auth';
import { useStyles } from './Header.styles';

const links = [
   { name: 'Strona główna', url: '/', testId: 'home' },
   { name: 'Zajęcia', url: '/workouts', testId: 'workouts' },
   { name: 'Sprzęt', url: '/equipment', testId: 'equipment' },
   { name: 'Trenerzy', url: '/trainers', testId: 'trainers' },
   { name: 'Grafik', url: '/timetable', testId: 'timetable' },
   { name: 'Kontakt', url: '/contact', testId: 'contact' },
   { name: 'Cennik', url: '/price-list', testId: 'price-list' },
];

const navLinks = () =>
   links.map((link) => (
      <NavLink
         key={link.name}
         name={link.name}
         link={link.url}
         testId={link.testId}
      />
   ));

const Header = () => {
   const classes = useStyles();
   const authContext = useContext(AuthContext);
   const [open, setOpen] = useState(false);

   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const menuButton = () =>
      authContext.isAuthenticated() && (
         <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
               [classes.hide]: open,
            })}
         >
            <Menu />
         </IconButton>
      );

   const linksToPublicPages = () =>
      !authContext.isAuthenticated() && (
         <div className={classes.mainNavlinks}>
            {navLinks()}
            <LoginButton />
         </div>
      );

   return (
      <AppBar
         aria-label="application bar"
         position="static"
         className={clsx(classes.root, {
            [classes.appBar]: authContext.isAuthenticated(),
            [classes.appBarShift]: open,
         })}
         // eslint-disable-next-line jsx-a11y/aria-role
         role="header"
      >
         <Toolbar
            className={clsx(classes.toolbar, {
               [classes.toolbarAuthenticated]: authContext.isAuthenticated(),
            })}
         >
            {menuButton()}
            {linksToPublicPages()}
            <PersonalMenu />
         </Toolbar>
      </AppBar>
   );
};

export default connect(null, { toggleDrawer })(Header);
