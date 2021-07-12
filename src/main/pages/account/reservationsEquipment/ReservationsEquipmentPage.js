import React from 'react';
import { useSelector } from 'react-redux';
import { selectData } from 'src/main/store/sliceFiles/timetable/equipmentReservationSlice';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { AccountEquipmentTimetable } from 'src/main/components/timetable';

const ReservationsEquipmentPage = () => {
   const data = useSelector(selectData);
   return (
      <PageWrapper>
         <PageTitle>Twoje rezerwacje sprzętu</PageTitle>
         <AccountEquipmentTimetable data={data} />
      </PageWrapper>
   );
};

export default ReservationsEquipmentPage;
