import React, { useState } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogActions,
   Typography,
   Button,
   DialogContent,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useStyles } from './RatingDialog.styles';

const RatingDialog = ({
   openDialog,
   setOpenDialog,
   callback,
   dialogTitle,
   eventTitle,
   rating,
}) => {
   const classes = useStyles();
   const [value, setValue] = useState(rating);
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
         <DialogContent className={classes.content}>
            <Rating
               precision={0.5}
               name="event-rating"
               defaultValue={value}
               value={value}
               onChange={(event, newValue) => setValue(newValue)}
               size="large"
            />
         </DialogContent>
         <DialogActions>
            <Button
               onClick={() => {
                  setOpenDialog(false);
                  callback(value);
               }}
               className={classes.button}
            >
               Oceń
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

export { RatingDialog };
