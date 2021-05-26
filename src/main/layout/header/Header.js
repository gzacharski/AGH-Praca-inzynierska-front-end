import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar } from '@material-ui/core';
import { NavLink } from 'src/main/components/buttons';
import { toggleDrawer } from 'src/main/store/state/action/creators';
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

   return (
      <AppBar
         aria-label="application bar"
         className={classes.root}
         position="static"
         // eslint-disable-next-line jsx-a11y/aria-role
         role="header"
      >
         <Toolbar className={classes.toolbar}>
            {navLinks()}
            <HeaderButtonsRenderer />
         </Toolbar>
      </AppBar>
   );
};

export default connect(null, { toggleDrawer })(Header);
