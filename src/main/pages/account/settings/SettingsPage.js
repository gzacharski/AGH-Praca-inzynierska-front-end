import React, { useState } from 'react';
import {
   Accordion,
   AccordionSummary,
   AccordionDetails,
   Container,
   FormControlLabel,
   Grid,
   Paper,
   Typography,
} from '@material-ui/core';
import { CheckBox, ExpandMore } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { selectDrawer } from 'src/main/store/sliceFiles/drawerSlice';
import { setAvatar } from 'src/main/store/sliceFiles/avatarSlice';
import {
   ChangeUserInfoForm,
   ChangePasswordForm,
} from 'src/main/components/forms';
import { useStyles } from './SettingsPage.styles';

const SettingsPage = () => {
   const drawer = useSelector(selectDrawer);
   const classes = useStyles();
   const dispatch = useDispatch();
   const [file, setFile] = useState(null);
   const handleFormSubmit = (event) => {
      event.preventDefault();
      dispatch(setAvatar(file));
   };
   const handleFileChange = (event) => setFile(event.target.files[0]);
   return (
      <Container
         maxWidth="xl"
         component="main"
         data-testid="main-container"
         className={clsx({
            [classes.root]: !drawer,
            [classes.rootMinimized]: drawer,
         })}
      >
         <Typography variant="h5" align="center" className={classes.title}>
            Ustawienia konta
         </Typography>
         <div className={classes.content}>
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                     <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        gutterBottom
                     >
                        Ustaw zdjęcie profilowe
                     </Typography>
                     <form onSubmit={handleFormSubmit}>
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">Upload</button>
                     </form>
                  </Paper>
               </Grid>
               {/* <Grid item xs={12} lg={6}>
                  <Paper className={classes.paper}>
                     <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        gutterBottom
                     >
                        Zmień hasło
                     </Typography>
                     <ResetPasswordForm />
                  </Paper>
               </Grid> */}
               <Grid item xs={12} lg={6}>
                  <ChangeUserInfoForm />
               </Grid>
               <Grid item xs={12} lg={6}>
                  <ChangePasswordForm />
               </Grid>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                     <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        gutterBottom
                     >
                        Modyfikuj ustawienia i prywatność konta
                     </Typography>
                     <div>
                        <Accordion>
                           <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-label="Expand"
                              aria-controls="additional-actions-content"
                              id="additional-actions1-header"
                           >
                              <FormControlLabel
                                 aria-label="Acknowledge"
                                 onClick={(event) => event.stopPropagation()}
                                 onFocus={(event) => event.stopPropagation()}
                                 control={<CheckBox />}
                                 label="I acknowledge that I should stop the click eve"
                              />
                           </AccordionSummary>
                           <AccordionDetails>
                              <Typography color="textSecondary">
                                 Sample text
                              </Typography>
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-label="Expand"
                              aria-controls="additional-actions-content"
                              id="additional-actions1-header"
                           >
                              <FormControlLabel
                                 aria-label="Acknowledge"
                                 onClick={(event) => event.stopPropagation()}
                                 onFocus={(event) => event.stopPropagation()}
                                 control={<CheckBox />}
                                 label="I acknowledge that I should stop the click eve"
                              />
                           </AccordionSummary>
                           <AccordionDetails>
                              <Typography color="textSecondary">
                                 Sample text
                              </Typography>
                           </AccordionDetails>
                        </Accordion>
                        <Accordion>
                           <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-label="Expand"
                              aria-controls="additional-actions-content"
                              id="additional-actions1-header"
                           >
                              <FormControlLabel
                                 aria-label="Acknowledge"
                                 onClick={(event) => event.stopPropagation()}
                                 onFocus={(event) => event.stopPropagation()}
                                 control={<CheckBox />}
                                 label="I acknowledge that I should stop the click eve"
                              />
                           </AccordionSummary>
                           <AccordionDetails>
                              <Typography color="textSecondary">
                                 Sample text
                              </Typography>
                           </AccordionDetails>
                        </Accordion>
                     </div>
                  </Paper>
               </Grid>
               <Grid item xs={12}>
                  <Paper className={classes.paper}>
                     <Typography
                        component="h2"
                        variant="h5"
                        color="primary"
                        gutterBottom
                     >
                        Usuń konto
                     </Typography>
                  </Paper>
               </Grid>
            </Grid>
         </div>
      </Container>
   );
};

export default SettingsPage;
