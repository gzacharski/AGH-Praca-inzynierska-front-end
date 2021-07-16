import { setupWorker } from 'msw';
import { handlers as loginHandlers } from './handlers/loginhandlers';
import { priceListHandlers } from './handlers/priceListHandler';
import { userEquipmentTimetableHandlers } from './handlers/timetableHandlers/userEquipmentTimetableHandler';
import { userGroupTimetableHandlers } from './handlers/timetableHandlers/userGroupTimetableHandler';
import { userIndividualTimetableHandler } from './handlers/timetableHandlers/userIndividualTimetableHandler';

const worker = setupWorker(
   ...loginHandlers,
   ...priceListHandlers,
   ...userGroupTimetableHandlers,
   ...userEquipmentTimetableHandlers,
   ...userIndividualTimetableHandler,
);

export { worker };
