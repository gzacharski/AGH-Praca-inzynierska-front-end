import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { NavLink } from 'src/main/components/buttons';
import { toggleDrawer } from 'src/main/store/state/action/creators';
import { AuthContext } from 'src/main/auth';
import { useStyles } from './Header.styles';
import { HeaderButtonsRenderer } from './HeaderButtonsRenderer';

const links = [
   { name: 'Strona główna', url: '/', testId: 'main' },
   { name: 'Aktualności', url: '/news', testId: 'news' },
   { name: 'Blog', url: '/blog', testId: 'blog' },
   { name: 'O nas', url: '/about', testId: 'about' },
   { name: 'Oferta', url: '/offer', testId: 'offer' },
   { name: 'Kontakt', url: '/contact', testId: 'contact' },
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

   return (
      <AppBar
         aria-label="application bar"
         // className={classes.root}
         position="fixed"
         className={clsx(classes.root, {
            [classes.appBar]: authContext.isAuthenticated(),
            [classes.appBarShift]: open,
         })}
         // eslint-disable-next-line jsx-a11y/aria-role
         role="header"
      >
         <Toolbar className={classes.toolbar}>
            {authContext.isAuthenticated() && (
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
            )}
            <div className={classes.mainNavlinks}>{navLinks()}</div>
            <HeaderButtonsRenderer />
         </Toolbar>
      </AppBar>
   );
};

export default connect(null, { toggleDrawer })(Header);
