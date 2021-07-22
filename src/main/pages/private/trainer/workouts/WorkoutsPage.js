import React from 'react';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector } from 'react-redux';
import { selectData } from 'src/main/store/sliceFiles/timetable/trainerSlice';
import { Timetable } from 'src/main/components/timetable';
import { ContentTooltip } from 'src/main/components/timetable/appointmentTooltip/ContentTooltip';
import { HeaderTooltip } from 'src/main/components/timetable/appointmentTooltip/HeaderTooltip';
import { CurrentDateContextProvider } from 'src/main/components/timetable/CurrentDateContext';

const WorkoutsPage = () => {
   const data = useSelector(selectData);
   return (
      <PageWrapper>
         <PageTitle>Aktualny grafik zajęć indywidualnych i grupowych</PageTitle>
         <CurrentDateContextProvider>
            <Timetable data={data}>
               <Toolbar />
               <TodayButton messages={{ today: 'Dzisiaj' }} />
               <Appointments />
               <AppointmentTooltip
                  showCloseButton
                  headerComponent={HeaderTooltip}
                  contentComponent={ContentTooltip}
               />
            </Timetable>
         </CurrentDateContextProvider>
      </PageWrapper>
   );
};

export default WorkoutsPage;
