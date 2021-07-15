import { startOfWeek, endOfWeek, formatISO } from 'date-fns';

const formatDate = (date) => formatISO(date, { representation: 'date' });

const getStartOfWeek = (date) =>
   formatDate(
      startOfWeek(date, {
         weekStartsOn: 1,
      }),
   );
const getEndOfWeek = (date) => formatDate(endOfWeek(date, { weekStartsOn: 1 }));

const getCurrentStartOfWeek = () => getStartOfWeek(Date.now());
const getCurrentEndOfWeek = () => getEndOfWeek(Date.now());

export {
   formatDate,
   getStartOfWeek,
   getEndOfWeek,
   getCurrentStartOfWeek,
   getCurrentEndOfWeek,
};
