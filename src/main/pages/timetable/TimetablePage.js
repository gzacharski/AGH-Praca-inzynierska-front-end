import React from 'react';
import { useSelector } from 'react-redux';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { PublicTimetable } from 'src/main/components/timetable';
import { selectData } from 'src/main/store/sliceFiles/timetable/timetableSlice';

const TimetablePage = () => {
   const data = useSelector(selectData);
   return (
      <PageWrapper>
         <PageTitle>Aktualny grafik zajęć</PageTitle>
         <PublicTimetable data={data} />
      </PageWrapper>
   );
};

export default TimetablePage;
