import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
   Accordion,
   Checkbox,
   AccordionSummary,
   AccordionDetails,
   FormControlLabel,
   Paper,
   Typography,
   IconButton,
   Grid,
   Tooltip,
} from '@material-ui/core';
import { Edit, Save, ExpandMore } from '@material-ui/icons';
import { AuthContext } from 'src/main/auth';
import {
   selectStatus,
   selectMessage,
   selectAgreements,
   fetchAgreements,
   setAgreements,
   clearMessage,
} from 'src/main/store/sliceFiles/agreementSlice';
import { STATUS } from 'src/main/store/status';
import { SaveChangesDialog } from 'src/main/components/dialogs';
import { useStyles } from './ChangeAccountPrivacyForm.styles';

const AcceptGeneralRegulations = ({
   regulationsAgreement,
   setRegulationsAgreement,
   disabled,
}) => {
   const classes = useStyles();
   return (
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
               control={
                  <Checkbox
                     disabled={disabled}
                     color="primary"
                     checked={regulationsAgreement}
                     onClick={() =>
                        setRegulationsAgreement(!regulationsAgreement)
                     }
                  />
               }
               label="Akceptuję regulamin klubu fitness."
            />
         </AccordionSummary>
         <AccordionDetails className={classes.accordionDetails}>
            <Typography
               variant="h4"
               color="textSecondary"
               classes={classes.paragraph}
            >
               Regulamin klubu
            </Typography>
            <Typography
               variant="body1"
               color="textSecondary"
               classes={classes.paragraph}
               paragraph
            >
               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
               Curabitur sollicitudin magna purus, at sodales nisi efficitur id.
               Mauris vulputate sed lacus vitae vulputate. Praesent at ipsum vel
               magna ullamcorper vestibulum in a lectus. Pellentesque id sodales
               erat. Ut tincidunt pulvinar nulla, vitae consectetur risus
               dignissim sed. Sed pulvinar tempus quam, vitae pulvinar turpis
               elementum ac. Donec venenatis massa quis quam iaculis, in
               hendrerit nunc consequat. Sed condimentum ultricies tellus, ac
               vulputate sapien pharetra vel. Vestibulum nibh justo, efficitur
               id convallis at, laoreet id purus. Vivamus ut nibh ac libero
               bibendum luctus. Curabitur vehicula feugiat bibendum. Nulla
               pulvinar enim eu enim rhoncus rutrum.
            </Typography>
            <Typography
               variant="body1"
               color="textSecondary"
               classes={classes.paragraph}
               paragraph
            >
               Phasellus suscipit sem at leo vestibulum, nec hendrerit quam
               condimentum. Cras porta nunc non leo laoreet lobortis. Phasellus
               venenatis iaculis magna at porttitor. Morbi quis nulla a ante
               molestie iaculis. Donec ut nisi sagittis, egestas sem finibus,
               euismod purus. Fusce ut tempus lectus. Maecenas elit elit,
               pharetra non interdum nec, pulvinar et eros. Curabitur turpis
               felis, iaculis at dolor id, lobortis volutpat diam. Proin quis
               dolor blandit magna elementum fermentum eget quis justo. Nunc
               tempor aliquet ex, at vulputate felis cursus et. Duis blandit
               sollicitudin lectus ut tincidunt. Lorem ipsum dolor sit amet,
               consectetur adipiscing elit. Pellentesque urna sem, lacinia vitae
               finibus at, mattis maximus tellus. Nunc et erat quis lacus porta
               condimentum. Pellentesque id erat sagittis, luctus lectus ut,
               vulputate leo.
            </Typography>
            <Typography
               color="textSecondary"
               classes={classes.paragraph}
               paragraph
            >
               Duis vulputate odio quis augue gravida mollis. Quisque arcu
               lectus, rhoncus et risus et, dignissim facilisis tortor.
               Suspendisse potenti. Maecenas et blandit urna. Aenean consectetur
               congue faucibus. Vestibulum vulputate dolor at iaculis imperdiet.
               Suspendisse tempor, tortor at lacinia porta, erat enim euismod
               neque, eget mattis nulla augue non dolor. Nulla eu scelerisque
               ante. In ut iaculis diam. Maecenas malesuada mauris in nibh
               ornare, ut finibus justo ullamcorper. Integer malesuada aliquam
               magna, in dignissim turpis finibus eu. In semper augue quis nibh
               viverra, id mollis massa aliquet. Suspendisse potenti. Morbi
               scelerisque, est eget dapibus mattis, magna nulla facilisis
               lacus, a volutpat sem est vel massa. Vestibulum vestibulum eget
               arcu id tempor.
            </Typography>
         </AccordionDetails>
      </Accordion>
   );
};

const AcceptAvatarPublic = ({
   avatarAgreement,
   setAvatarAgreement,
   disabled,
}) => (
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
            control={
               <Checkbox
                  disabled={disabled}
                  color="primary"
                  checked={avatarAgreement}
                  onClick={() => setAvatarAgreement(!avatarAgreement)}
               />
            }
            label="Akceptuję wyświetlanie podstawowych informacji o koncie w serwisie."
         />
      </AccordionSummary>
      <AccordionDetails>
         <Typography color="textSecondary">
            Twoje zdjęcie profilowe i podstawowe informacje będą wyświetlane w
            serwisie. W przeciwnym wypadku Twoje konto zostanie wyświetlone jako
            anonimowe.
         </Typography>
      </AccordionDetails>
   </Accordion>
);

const AcceptTrainingAttentence = ({
   trainingAgreement,
   setTrainingAgreement,
   disabled,
}) => (
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
            control={
               <Checkbox
                  disabled={disabled}
                  checked={trainingAgreement}
                  onClick={() => setTrainingAgreement(!trainingAgreement)}
                  color="primary"
               />
            }
            label="Akceptuje wyświetlanie udziału w treningach."
         />
      </AccordionSummary>
      <AccordionDetails>
         <Typography color="textSecondary">
            Twoje zdjęcie profilowe i podstawowe informacje będą wyświetlane
            przy zajęciach grupowych w których bierzesz udział. W przeciwnym
            wypadku Twoje konto zostanie wyświetlone jako anonimowe.
         </Typography>
      </AccordionDetails>
   </Accordion>
);

const AcceptStatistics = ({ statsAgreement, setStatsAgreement, disabled }) => (
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
            control={
               <Checkbox
                  disabled={disabled}
                  checked={statsAgreement}
                  onClick={() => setStatsAgreement(!statsAgreement)}
                  color="primary"
               />
            }
            label="Akceptuje wyświetlanie statystyk na temat konta."
         />
      </AccordionSummary>
      <AccordionDetails>
         <Typography color="textSecondary">
            Twoje statystyki będą dostępne dla innych użytkowników.
         </Typography>
      </AccordionDetails>
   </Accordion>
);

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
               <Tooltip title="Edytuj" placement="bottom" arrow>
                  <IconButton
                     className={classes.icon}
                     onClick={() => {
                        toggleEditable(!editable);
                     }}
                  >
                     <Edit fontSize="large" />
                  </IconButton>
               </Tooltip>
               <Tooltip title="Zapisz zmiany" placement="bottom" arrow>
                  <IconButton
                     disabled={editable}
                     className={classes.icon}
                     onClick={() => setOpenDialog(true)}
                  >
                     <Save fontSize="large" />
                  </IconButton>
               </Tooltip>
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
