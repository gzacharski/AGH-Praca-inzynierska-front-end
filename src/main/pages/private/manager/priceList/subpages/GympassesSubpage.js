/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { LinearProgress, Paper } from '@material-ui/core';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { GympassTable } from 'src/main/components/tables';
import {
   selectMessage,
   selectStatus,
   clearMessage,
   selectNotistack,
   selectAll,
   fetchLocationList,
} from 'src/main/store/sliceFiles/locationsSlice';

const testData = [
   {
      documentId: nanoid(),
      id: nanoid(),
      title: 'Wejście jednorazowe',
      subheader: null,
      price: {
         amount: 19.99,
         currency: 'zł',
         period: 'wejście',
      },
      isPremium: false,
      description: {
         synopsis: 'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
         features: [
            'dostęp do każdego sprzętu fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'dostęp do sauny',
         ],
      },
      status: 'inactive',
   },
   {
      documentId: nanoid(),
      id: nanoid(),
      title: 'Karnet 4 wejścia',
      subheader: 'Najpopularniejszy dla ograniczonej liczby wejść',
      price: {
         amount: 69.99,
         currency: 'zł',
         period: '4 wejścia',
      },
      isPremium: true,
      description: {
         synopsis: 'Karnet idealny dla osób o nieregularnym trybie życia',
         features: [
            'dostęp do każdego sprzętu fitness',
            'grupowe i indywidualne zajęcia fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'nieograniczona ważność karnetu',
            'dostęp do sauny',
         ],
      },
      status: 'active',
   },
   {
      documentId: nanoid(),
      id: nanoid(),
      title: 'Karnet 8 wejść',
      subheader: null,
      price: {
         amount: 108.99,
         currency: 'zł',
         period: '8 wejść',
      },
      isPremium: false,
      description: {
         synopsis: 'Karnet idealny dla osób o nieregularnym trybie życia',
         features: [
            'dostęp do każdego sprzętu fitness',
            'grupowe i indywidualne zajęcia fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'nieograniczona ważność karnetu',
            'dostęp do sauny',
         ],
      },
      status: 'archive',
   },
   {
      documentId: nanoid(),
      id: nanoid(),
      title: 'Standardowy',
      subheader: 'Najpopularniejszy',
      price: {
         amount: 139.99,
         currency: 'zł',
         period: 'miesiąc',
      },
      isPremium: true,
      description: {
         synopsis: 'Najlepszy wybór dla osób regularnie ćwiczących',
         features: [
            'dostęp do każdego sprzętu fitness',
            'grupowe i indywidualne zajęcia fitness',
            'dowolne godziny wejścia',
            'nieograniczony czas wejścia',
            'nieograniczona liczba wejść',
            'ważność 30 dni',
            'dostęp do sauny',
         ],
      },
      status: 'active',
   },
];

export const GympassesSubpage = () => {
   const dispatch = useDispatch();
   const status = useSelector(selectStatus);
   const locations = useSelector(selectAll);
   const message = useSelector(selectMessage);
   const notistackVariant = useSelector(selectNotistack);
   const auth = useAuth();
   const [pageNumber, setPageNumber] = useState(0);
   const [pageSize, setPageSize] = useState(10);
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      if (status === STATUS.IDLE) {
         const { token = '' } = auth;
         dispatch(fetchLocationList({ pageNumber, pageSize, token }));
      }
   }, [status, dispatch]);

   if (message) {
      enqueueSnackbar(message, {
         variant: notistackVariant,
         anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
         },
      });
      dispatch(clearMessage());
   }

   const shouldRenderProgress =
      status === STATUS.IDLE || status === STATUS.LOADING;

   return (
      <Paper>
         {shouldRenderProgress && <LinearProgress />}
         <GympassTable
            data={testData}
            pageNumber={pageNumber}
            pageSize={pageSize}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
         />
      </Paper>
   );
};
