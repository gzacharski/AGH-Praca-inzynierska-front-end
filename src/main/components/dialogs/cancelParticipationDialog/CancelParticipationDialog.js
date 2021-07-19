import React from 'react';
import {
   Dialog,
   DialogTitle,
   DialogActions,
   Typography,
   Button,
} from '@material-ui/core';
import { useStyles } from './CancelParticipationDialog.styles';

const CancelParticipationDialog = ({
   openDialog,
   setOpenDialog,
   callback,
   dialogTitle,
   eventTitle,
}) => {
   const classes = useStyles();
   return (
      <Dialog
         open={openDialog}
         maxWidth="sm"
         fullWidth
         onClose={() => setOpenDialog(false)}
      >
         <DialogTitle>
            <Typography variant="h6" color="primary">
               {dialogTitle}
            </Typography>
            <Typography variant="subtitle1" color="primary">
               {eventTitle}
            </Typography>
         </DialogTitle>
         <DialogActions>
            <Button
               onClick={() => {
                  setOpenDialog(false);
                  callback();
               }}
               className={classes.button}
            >
               Zrezygnuj
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

export { CancelParticipationDialog };
