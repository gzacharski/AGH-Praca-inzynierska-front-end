import React, { useContext } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
   selectDrawer,
   toggleDrawer,
} from 'src/main/store/sliceFiles/drawerSlice';
import { NavLink, LoginButton } from 'src/main/components/buttons';
import { PersonalMenu } from 'src/main/components/buttonGroups';
import { AuthContext } from 'src/main/auth';
import { FilterRenderer } from 'src/main/components/utils';
import { filteredUrls } from 'src/main/data/filteredUrls';
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
   const dispatch = useDispatch();
   const menuIsOpen = useSelector(selectDrawer);

   const menuButton = () =>
      authContext.isAuthenticated() && (
         <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggleDrawer())}
            edge="start"
            className={clsx(classes.menuButton, {
               [classes.hide]: menuIsOpen,
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
         position="fixed"
         className={clsx(classes.root, {
            [classes.appBar]: authContext.isAuthenticated(),
            [classes.appBarShift]: menuIsOpen,
         })}
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

export default function HeaderFiltered() {
   return (
      <FilterRenderer urls={filteredUrls}>
         <Header />
      </FilterRenderer>
   );
}
