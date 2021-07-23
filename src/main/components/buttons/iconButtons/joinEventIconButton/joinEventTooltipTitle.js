import { isPast, isFuture, subDays } from 'date-fns';

export const joinEventTooltipTitle = (startDate) => {
   if (isPast(Date.parse(startDate))) return 'Zajęcia już się odbyły.';
   if (isFuture(subDays(Date.parse(startDate), 7)))
      return 'Możliwość zapisu na zajęcia wyłącznie w ciągu 7 dni przed rozpoczęciem zajęć.';
   return 'Dołącz do zajęć.';
};
