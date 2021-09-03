/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   Dialog,
   Grid,
   TextField,
   makeStyles,
   LinearProgress,
   Typography,
   Select,
   MenuItem,
   FormControl,
   InputLabel,
   Button,
   Collapse,
} from '@material-ui/core';
import { DateTimePicker, DatePicker } from '@material-ui/pickers';
import { parseISO, formatISO } from 'date-fns';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import {
   fetchUserGympass,
   selectGympassStatus,
   purchaseGymPass,
   checkGymPassValidity,
} from 'src/main/store/sliceFiles/adminSlices/usersSlice';
import {
   fetchPriceList,
   selectPriceList,
   selectStatus,
} from 'src/main/store/sliceFiles/priceListSlice';
import { useAuth } from 'src/main/auth';
import { STATUS } from 'src/main/store/status';

const useStyles = makeStyles(({ spacing }) => ({
   root: {
      padding: spacing(2),
   },
   button: {
      display: 'flex',
      justifyContent: 'space-between',
   },
}));

const GympassForm = ({ user = {}, onClose = () => false }) => {
   const classes = useStyles();
   const status = useSelector(selectGympassStatus);
   const priceListStatus = useSelector(selectStatus);
   const priceList = useSelector(selectPriceList);

   const dispatch = useDispatch();
   const { authState = {} } = useAuth();
   const { token = '' } = authState;

   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const [purchaseDate, setPurchaseDate] = useState(new Date());
   const [selectedGympass, setSelectedGympass] = useState('');
   const [purchaseMode, setPurchaseMode] = useState(false);

   const { userId = '', name = '', surname = '', gympass } = user;
   const {
      gymPassOffer = {},
      entries = 0,
      purchasedGymPassDocumentId = '',
   } = gympass || {};

   const { gymPassOfferId = '', temporaryPass = false } = gymPassOffer;

   useEffect(() => {
      if (Boolean(gympass) === false) {
         dispatch(fetchUserGympass({ userId, token }));
      } else {
         setStartDate(parseISO(gympass?.startDate || '2020-10-10'));
         setEndDate(parseISO(gympass?.endDate || '2020-10-10'));
         setPurchaseDate(
            parseISO(gympass?.purchaseDateTime || '1900-01-11T01:30:30'),
         );
         setSelectedGympass(gymPassOfferId || '');
      }
   }, [gympass]);

   useEffect(() => {
      if (purchasedGymPassDocumentId) {
         dispatch(
            checkGymPassValidity({
               purchasedGymPassDocumentId:
                  gympass?.purchasedGymPassDocumentId || '',
               userId,
               token,
            }),
         );
      }
   }, [purchasedGymPassDocumentId, dispatch]);

   useEffect(() => {
      if (priceListStatus === STATUS.IDLE) {
         dispatch(fetchPriceList({}));
      }
   }, [priceListStatus, dispatch]);

   const handlePurchaseGympass = () => {
      dispatch(
         purchaseGymPass({
            userId,
            gymPassOfferId: selectedGympass,
            startDate: formatISO(purchaseDate, { representation: 'date' }),
            token,
         }),
      );
      onClose();
      setPurchaseMode(false);
   };

   const buttonName = purchaseMode ? 'Anuluj' : 'Kup karnet';
   return (
      <div className={classes.root}>
         {status === STATUS.LOADING && <LinearProgress />}
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Typography>Użytkownik</Typography>
            </Grid>
            <Grid item xs={6}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  disabled
                  id="name"
                  label="Imię"
                  name="name"
                  type="text"
                  value={name}
               />
            </Grid>
            <Grid item xs={6}>
               <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  disabled
                  id="surname"
                  label="Nazwisko"
                  name="surname"
                  type="text"
                  value={surname}
               />
            </Grid>
            <Grid item xs={12}>
               {gympass ? (
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Typography>Posiadany karnet</Typography>
                     </Grid>
                     <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth disabled>
                           <InputLabel shrink id="select-training-type">
                              Typ karnetu
                           </InputLabel>
                           <Select
                              id="select-training-type"
                              label="Typ karnetu"
                              value={selectedGympass}
                              onChange={(event) =>
                                 setSelectedGympass(event.target.value)
                              }
                              className={classes.select}
                              displayEmpty
                              fullWidth
                              variant="outlined"
                           >
                              <MenuItem value="" disabled>
                                 Wybierz typ treningu
                              </MenuItem>
                              {priceList.map((theGympass) => {
                                 const { documentId = '', title = '' } =
                                    theGympass || {};
                                 return (
                                    <MenuItem
                                       key={documentId}
                                       value={documentId}
                                    >
                                       {title}
                                    </MenuItem>
                                 );
                              })}
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={6}>
                        <DateTimePicker
                           value={purchaseDate}
                           onChange={setPurchaseDate}
                           ampm={false}
                           disableToolbar
                           fullWidth
                           label="Data i godzina zakupu karnetu"
                           variant="inline"
                           format="dd MMMM yyyy HH:mm:ss"
                           inputVariant="outlined"
                           disabled
                        />
                     </Grid>
                     <Grid item xs={6}>
                        <DatePicker
                           value={startDate}
                           onChange={setStartDate}
                           disableToolbar
                           fullWidth
                           label="Data aktywacji karnetu"
                           orientation="landscape"
                           variant="inline"
                           format="dd MMMM yyyy"
                           inputVariant="outlined"
                           disabled
                        />
                     </Grid>
                     <Grid item xs={6}>
                        {temporaryPass && (
                           <DatePicker
                              value={endDate}
                              onChange={setEndDate}
                              disableToolbar
                              fullWidth
                              label="Data zakończenia karnetu"
                              orientation="landscape"
                              variant="inline"
                              format="dd MMMM yyyy"
                              inputVariant="outlined"
                              disabled
                           />
                        )}
                        {!temporaryPass && (
                           <TextField
                              variant="outlined"
                              margin="normal"
                              fullWidth
                              disabled
                              label="Dostępna ilość wejść"
                              value={entries}
                           />
                        )}
                     </Grid>
                  </Grid>
               ) : (
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Typography>Brak posiadanego karnetu</Typography>
                     </Grid>
                     <Grid item xs={12} justifyContent="center">
                        <div className={classes.button}>
                           <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => setPurchaseMode((state) => !state)}
                           >
                              {buttonName}
                           </Button>
                           {purchaseMode && (
                              <Button
                                 variant="outlined"
                                 color="primary"
                                 onClick={handlePurchaseGympass}
                                 disabled={!selectedGympass}
                              >
                                 Zakup
                              </Button>
                           )}
                        </div>
                     </Grid>
                     <Grid item xs={12}>
                        <Collapse in={purchaseMode}>
                           <Grid container spacing={2}>
                              <Grid item xs={6}>
                                 <Select
                                    value={selectedGympass}
                                    onChange={(event) =>
                                       setSelectedGympass(event.target.value)
                                    }
                                    className={classes.select}
                                    displayEmpty
                                    fullWidth
                                    variant="outlined"
                                 >
                                    <MenuItem value="" disabled>
                                       Wybierz typ treningu
                                    </MenuItem>
                                    {priceList.map((theGympass) => {
                                       const { documentId = '', title = '' } =
                                          theGympass || {};
                                       return (
                                          <MenuItem
                                             key={documentId}
                                             value={documentId}
                                          >
                                             {title}
                                          </MenuItem>
                                       );
                                    })}
                                 </Select>
                              </Grid>
                              <Grid item xs={6}>
                                 <DatePicker
                                    value={startDate}
                                    onChange={setStartDate}
                                    disableToolbar
                                    fullWidth
                                    label="Data aktywacji karnetu"
                                    orientation="landscape"
                                    variant="inline"
                                    format="dd MMMM yyyy"
                                    inputVariant="outlined"
                                    disablePast
                                 />
                              </Grid>
                           </Grid>
                        </Collapse>
                     </Grid>
                  </Grid>
               )}
            </Grid>
         </Grid>
      </div>
   );
};

export const GympassDialog = ({ selectById }) => {
   const { dialogState, closeDialog, entityId } = useContext(DialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, entityId));

   const shouldOpen = mode === DIALOG_MODE.GYMPASS && isOpen;

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="sm">
         {shouldOpen && (
            <GympassForm user={selectedRow} onClose={closeDialog} />
         )}
      </Dialog>
   );
};
