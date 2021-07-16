import { setupWorker } from 'msw';
import { handlers as userGroupTimetableHandlers } from './handlers/timetableHandlers/userGroupTimetableHandler';
import { handlers as loginHandlers } from './handlers/loginhandlers';
import { offerHandlers } from './handlers/offerHandler';

const worker = setupWorker(
   ...userGroupTimetableHandlers,
   ...loginHandlers,
   ...offerHandlers,
);

export { worker };
