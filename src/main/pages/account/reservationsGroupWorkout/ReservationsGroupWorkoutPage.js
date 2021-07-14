import React from 'react';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { AccountGroupTimetable } from 'src/main/components/timetable/AccountGroupTimetable';

const ReservationGroupWorkoutPage = () => (
   <PageWrapper>
      <PageTitle>Twoje rezerwacje zajęć grupowych</PageTitle>
      <AccountGroupTimetable />
   </PageWrapper>
);

export default ReservationGroupWorkoutPage;
