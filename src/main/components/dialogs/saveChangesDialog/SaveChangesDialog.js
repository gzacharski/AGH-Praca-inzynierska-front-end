import React from 'react';
import {
   Typography,
   Button,
   Dialog,
   DialogTitle,
   DialogActions,
} from '@material-ui/core';
import { useStyles } from './SaveChangesDialog.styles';

const SaveChangesDialog = ({
   openDialog,
   setOpenDialog,
   form,
   callback,
   title,
   buttonText,
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
               {title || 'Czy na pewno chcesz zapisać zmiany?'}
            </Typography>
         </DialogTitle>
         <DialogActions>
            <Button
               type={form && 'submit'}
               form={form}
               onClick={() => {
                  if (!form) {
                     callback();
                     setOpenDialog(false);
                  }
               }}
               className={classes.button}
            >
               {buttonText || 'Zapisz'}
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

export { SaveChangesDialog };
