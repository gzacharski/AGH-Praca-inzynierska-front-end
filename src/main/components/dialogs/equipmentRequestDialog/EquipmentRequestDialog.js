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
import { UserEquipmentContext } from 'src/main/components/timetable/userEquipmentTimetable/UserEquipmentContext';
import { useStyles } from './EquipmentRequestDialog.styles';

const EquipmentRequestDialog = () => {
   const classes = useStyles();
   const context = useContext(UserEquipmentContext);
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
               Rezerwacja sprzętu fitness
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
               }}
               className={classes.button}
            >
               Zarezerwuj
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

export { EquipmentRequestDialog };
