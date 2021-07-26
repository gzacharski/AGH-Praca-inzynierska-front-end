import { isFuture, differenceInMinutes } from 'date-fns';

const cancelParticipationTitle = (startDate) => {
   const difference = differenceInMinutes(Date.parse(startDate), Date.now());

   if (difference <= 60 && difference > 0)
      return 'Nie można anulować uczestnistwa na godzinę przed rozpoczęciem zajęć.';

   return 'Nie można anuluwać uczestnistwa w zajęciach, które już się odbyły.';
};

const ratingTooltipTitle = (startDate) => {
   if (isFuture(Date.parse(startDate)))
      return 'Nie można oceniać zajęć przed ich rozpoczęciem.';
   return 'Oceny zajęć można dokonać wyłącznie w ciągu 7 dni od daty zakończenia zajęć.';
};

const cancelEquipmentReservationTitle = (startDate) => {
   const difference = differenceInMinutes(Date.parse(startDate), Date.now());

   if (difference <= 60 && difference > 0)
      return 'Nie można anulować rezerwacji na godzinę przed rozpoczęciem treningu.';

   return 'Nie można anuluwać rezerwacji sprzętu treningowego.';
};

const ratingEquipmentTooltipTitle = (startDate) => {
   if (isFuture(Date.parse(startDate)))
      return 'Nie można oceniać sprzętu treningowego przed treningiem.';
   return 'Oceny sprzętu treningowgo można dokonać wyłącznie w ciągu 7 dni.';
};

export {
   cancelParticipationTitle,
   ratingTooltipTitle,
   cancelEquipmentReservationTitle,
   ratingEquipmentTooltipTitle,
};
