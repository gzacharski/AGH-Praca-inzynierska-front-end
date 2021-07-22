import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Paper, Typography, Grid } from '@material-ui/core';
import { AuthContext } from 'src/main/auth';
import {
   selectStatus,
   selectMessage,
   selectAgreements,
   fetchAgreements,
   setAgreements,
   clearMessage,
} from 'src/main/store/sliceFiles/agreementSlice';
import { STATUS } from 'src/main/store';
import { SaveChangesDialog } from 'src/main/components/dialogs';
import { SaveIconButton, EditIconButton } from 'src/main/components/buttons';
import { useStyles } from './ChangeAccountPrivacyForm.styles';
import { AcceptAvatarPublic } from './accordions/AcceptAvatarPublic';
import { AcceptGeneralRegulations } from './accordions/AcceptGeneralRegulations';
import { AcceptStatistics } from './accordions/AcceptStatistics';
import { AcceptTrainingAttentence } from './accordions/AcceptTrainingAttentence';

export const ChangeAccountPrivacyForm = () => {
   const context = useContext(AuthContext);
   const classes = useStyles();
   const [editable, toggleEditable] = useState(true);
   const [openDialog, setOpenDialog] = useState(false);
   const [avatarAgreement, setAvatarAgreement] = useState(null);
   const [trainingAgreement, setTrainingAgreement] = useState(null);
   const [statsAgreement, setStatsAgreement] = useState(null);
   const [regulationsAgreement, setRegulationsAgreement] = useState(null);
   const { enqueueSnackbar } = useSnackbar();

   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const agreements = useSelector(selectAgreements);
   const message = useSelector(selectMessage);

   const { regulation, training, avatar, stats } = agreements;

   if (avatarAgreement === null && regulation !== null) {
      setRegulationsAgreement(regulation);
   }

   if (trainingAgreement === null && training !== null) {
      setTrainingAgreement(training);
   }

   if (avatarAgreement === null && avatar !== null) {
      setAvatarAgreement(avatar);
   }

   if (statsAgreement === null && stats !== null) {
      setStatsAgreement(stats);
   }

   const isAuthenticated = context.isAuthenticated();

   useEffect(() => {
      if (isAuthenticated && status === STATUS.IDLE) {
         dispatch(fetchAgreements());
      }
   }, [status, dispatch]);

   const handleSetAgreements = () => {
      toggleEditable(!editable);
      setOpenDialog(false);
      dispatch(
         setAgreements({
            regulation: regulationsAgreement,
            training: trainingAgreement,
            avatar: avatarAgreement,
            stats: statsAgreement,
         }),
      );
   };

   if (message) {
      const variant = status === STATUS.SUCCEEDED ? 'success' : 'error';
      enqueueSnackbar(message, {
         variant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   return (
      <Paper className={classes.paper}>
         <div className={classes.header}>
            <Typography
               variant="h5"
               color="primary"
               gutterBottom
               className={classes.title}
            >
               Ustawienia i prywatność konta
            </Typography>
            <div className={classes.headerButtons}>
               <EditIconButton
                  callback={() => {
                     toggleEditable(!editable);
                  }}
               />
               <SaveIconButton
                  editable={editable}
                  callback={() => setOpenDialog(true)}
               />
               <SaveChangesDialog
                  openDialog={openDialog}
                  setOpenDialog={setOpenDialog}
                  callback={handleSetAgreements}
               />
            </div>
         </div>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <AcceptAvatarPublic
                  avatarAgreement={avatarAgreement}
                  setAvatarAgreement={setAvatarAgreement}
                  disabled={editable}
               />
               <AcceptTrainingAttentence
                  trainingAgreement={trainingAgreement}
                  setTrainingAgreement={setTrainingAgreement}
                  disabled={editable}
               />
               <AcceptStatistics
                  statsAgreement={statsAgreement}
                  setStatsAgreement={setStatsAgreement}
                  disabled={editable}
               />
               <AcceptGeneralRegulations
                  regulationsAgreement={regulationsAgreement}
                  setRegulationsAgreement={setRegulationsAgreement}
                  disabled={editable}
               />
            </Grid>
         </Grid>
      </Paper>
   );
};
