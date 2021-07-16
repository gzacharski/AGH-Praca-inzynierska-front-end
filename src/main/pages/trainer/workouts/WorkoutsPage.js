import React from 'react';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector } from 'react-redux';
import { selectData } from 'src/main/store/sliceFiles/timetable/trainerSlice';
import { Timetable } from 'src/main/components/timetable';
import { ContentTooltip } from 'src/main/components/timetable/appointmentTooltip/ContentTooltip';
import { HeaderTooltip } from 'src/main/components/timetable/appointmentTooltip/HeaderTooltip';

const WorkoutsPage = () => {
   const data = useSelector(selectData);
   return (
      <PageWrapper>
         <PageTitle>Aktualny grafik zajęć indywidualnych i grupowych</PageTitle>
         <Timetable data={data}>
            <AppointmentTooltip
               showCloseButton
               headerComponent={HeaderTooltip}
               contentComponent={ContentTooltip}
            />
         </Timetable>
      </PageWrapper>
   );
};

export default WorkoutsPage;
