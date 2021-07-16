import { setupWorker } from 'msw';
import { handlers as userGroupTimetableHandlers } from './handlers/timetableHandlers/userGroupTimetableHandler';
import { handlers as loginHandlers } from './handlers/loginhandlers';
import { priceListHandlers } from './handlers/priceListHandler';
import { userEquipmentTimetableHandlers } from './handlers/timetableHandlers/userEquipmentTimetableHandler';

const worker = setupWorker(
   ...userGroupTimetableHandlers,
   ...loginHandlers,
   ...priceListHandlers,
   ...userEquipmentTimetableHandlers,
);

export { worker };
