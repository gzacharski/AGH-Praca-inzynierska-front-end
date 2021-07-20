import { setupWorker } from 'msw';
import { handlers as loginHandlers } from './handlers/loginhandlers';
import { priceListHandlers } from './handlers/priceListHandler';
import { userEquipmentTimetableHandlers } from './handlers/timetableHandlers/userEquipmentTimetableHandler';
import { userGroupTimetableHandlers } from './handlers/timetableHandlers/userGroupTimetableHandler';
import { userIndividualTimetableHandler } from './handlers/timetableHandlers/userIndividualTimetableHandler';
import { publicTimetableHandlers } from './handlers/timetableHandlers/publicTimetableHandler';
import { trainerListHandlers } from './handlers/trainerListHandlers';

const worker = setupWorker(
   ...priceListHandlers,
   ...userGroupTimetableHandlers,
   ...userEquipmentTimetableHandlers,
   ...userIndividualTimetableHandler,
   ...publicTimetableHandlers,
   ...trainerListHandlers,
   ...loginHandlers,
);

export { worker };
