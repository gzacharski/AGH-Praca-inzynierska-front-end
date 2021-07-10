import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import {
   ChangeUserInfoForm,
   ChangePasswordForm,
   ChangeAvatarForm,
   ChangeAccountPrivacyForm,
   DeleteAccountForm,
} from 'src/main/components/forms';
import { useStyles } from './SettingsPage.styles';

const SettingsPage = () => {
   const classes = useStyles();
   return (
      <Container
         maxWidth="xl"
         component="main"
         data-testid="main-container"
         className={classes.root}
      >
         <Typography variant="h5" align="center" className={classes.title}>
            Ustawienia konta
         </Typography>
         <div className={classes.content}>
            <Grid container spacing={3} justify="center">
               <Grid item xs={12} sm={9}>
                  <ChangeAvatarForm />
               </Grid>
               <Grid item xs={12} sm={9} md={6}>
                  <ChangeUserInfoForm />
               </Grid>
               <Grid item xs={12} sm={9} md={6}>
                  <ChangePasswordForm />
               </Grid>
               <Grid item xs={12}>
                  <ChangeAccountPrivacyForm />
               </Grid>
               <Grid item xs={12} sm={9} lg={6}>
                  <DeleteAccountForm />
               </Grid>
            </Grid>
         </div>
      </Container>
   );
};

export default SettingsPage;
