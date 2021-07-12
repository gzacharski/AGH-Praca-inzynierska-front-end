import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { PageWrapper } from 'src/main/components/utils';
import { PublicTimetable } from 'src/main/components/timetable';
import {
   selectData,
   addAppointment,
} from 'src/main/store/sliceFiles/timetableSlice';
import { useStyles } from './TimetablePage.styles';

export default function TimetablePage() {
   const classes = useStyles();
   const data = useSelector(selectData);
   const dispatch = useDispatch();
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Aktualny grafik zajęć
         </Typography>
         <Button
            onClick={() =>
               dispatch(
                  addAppointment({
                     id: 'brzuchy',
                     title: 'Brzuch',
                     startDate: '2021-07-17T12:45',
                     endDate: '2021-07-17T14:00',
                     location: 'Sala nr 4',
                     allDay: false,
                  }),
               )
            }
         >
            Test
         </Button>
         <PublicTimetable data={data} />
      </PageWrapper>
   );
}
