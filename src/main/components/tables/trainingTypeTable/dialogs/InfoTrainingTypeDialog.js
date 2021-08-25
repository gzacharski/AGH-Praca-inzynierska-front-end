/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
   Grid,
   Paper,
   makeStyles,
   Avatar,
} from '@material-ui/core';
import { selectById } from 'src/main/store/sliceFiles/workoutSlice';
import {
   RowDialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/RowDialogContext';

const useStyles = makeStyles(({ spacing }) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   avatar: {
      width: spacing(4),
      height: spacing(4),
   },
}));

export const InfoTrainingTypeDialog = () => {
   const classes = useStyles();
   const { dialogState, closeDialog, rowId } = useContext(RowDialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, rowId)) || {};
   const {
      trainingTypeId = '',
      title = '',
      image = '',
      description = '',
      trainer = {},
      rating = 0,
      duration = '',
   } = selectedRow;

   const { name = '', surname = '', avatar = '' } = trainer;

   const shouldOpen = mode === INFO && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="md">
         <DialogTitle>
            <Typography variant="h6" color="primary">
               Szczegółowe informacje o treningu: {title}
            </Typography>
         </DialogTitle>
         <DialogContent>
            <Grid container spacing={1}>
               <Grid item xs={3}>
                  <Paper>Id:</Paper>
               </Grid>
               <Grid item xs={9}>
                  <Paper>{trainingTypeId}</Paper>
               </Grid>

               <Grid item xs={3}>
                  <Paper>Tytuł:</Paper>
               </Grid>
               <Grid item xs={9}>
                  <Paper>{title}</Paper>
               </Grid>

               <Grid item xs={3}>
                  <Paper>Zdjęcie:</Paper>
               </Grid>
               <Grid item xs={9}>
                  <Paper>
                     <img src={image} alt={title} />
                  </Paper>
               </Grid>

               <Grid item xs={3}>
                  <Paper>Opis:</Paper>
               </Grid>
               <Grid item xs={9}>
                  <Paper>{description}</Paper>
               </Grid>

               <Grid item xs={3}>
                  <Paper>Przypisany trener:</Paper>
               </Grid>
               <Grid item xs={9}>
                  <Paper>
                     <div
                        style={{
                           display: 'inline-flex',
                           justifyContent: 'space-between',
                        }}
                     >
                        <Avatar
                           alt={`${name} ${surname}`}
                           src={avatar}
                           className={classes.avatar}
                        >{`${name?.[0]}${surname?.[0]}`}</Avatar>
                        <Typography>{`${name} ${surname}`}</Typography>
                     </div>
                  </Paper>
               </Grid>

               <Grid item xs={3}>
                  <Paper>Ocena:</Paper>
               </Grid>
               <Grid item xs={9}>
                  <Paper>{rating}</Paper>
               </Grid>

               <Grid item xs={3}>
                  <Paper>Czas treningu:</Paper>
               </Grid>
               <Grid item xs={9}>
                  <Paper>{duration}</Paper>
               </Grid>
            </Grid>
         </DialogContent>
      </Dialog>
   );
};
