import React from 'react';
import { Container, Divider, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { FilterRenderer } from 'src/main/components/utils';
import { useStyles } from './Footer.styles';

const Footer = () => {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="footer" className={classes.root}>
         <Divider className={classes.divider} />
         <Typography
            align="center"
            component="h6"
            className={classes.footer_title}
         >
            <Link component={RouterLink} to="/" color="inherit">
               System do wspomagania zarządzania placówką profilaktyki
               zdrowotnej
            </Link>
         </Typography>
         <Typography align="center" component="p">
            Bartosz Kordek Grzegorz Zacharski
         </Typography>
         <Typography align="center" component="p">
            2020/2021
         </Typography>
      </Container>
   );
};

export default function FilteredFooter() {
   const filteredUrls = [
      '/login',
      '/sign-up',
      '/confirmRegistration',
      '/confirmNewPassword',
   ];
   return (
      <FilterRenderer urls={filteredUrls}>
         <Footer />
      </FilterRenderer>
   );
}
