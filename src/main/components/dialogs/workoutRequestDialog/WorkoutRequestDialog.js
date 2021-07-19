import React, { useContext } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogActions,
   DialogContent,
   Divider,
   Typography,
   Button,
} from '@material-ui/core';
import { IndividualWorkoutContext } from 'src/main/components/timetable/userIndividualTimetable/IndividualWorkoutContex';
import { useStyles } from './WorkoutRequestDialog.styles';

const WorkoutRequestDialog = () => {
   const classes = useStyles();
   const context = useContext(IndividualWorkoutContext);
   const { openDialog, setOpenDialog } = context;
   return (
      <Dialog
         open={openDialog}
         maxWidth="sm"
         fullWidth
         onClose={() => setOpenDialog(false)}
      >
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Zapytanie o trening personalny
            </Typography>
         </DialogTitle>
         <Divider />
         <DialogContent>
            <Typography variant="subtitle1" color="primary">
               Miejsce na formularz
            </Typography>
         </DialogContent>
         <Divider />
         <DialogActions>
            <Button
               onClick={() => {
                  setOpenDialog(false);
                  console.log('Test');
               }}
               className={classes.button}
            >
               Wyślij zapytanie
            </Button>
            <Button
               className={classes.button}
               onClick={() => setOpenDialog(false)}
            >
               Anuluj
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export { WorkoutRequestDialog };
