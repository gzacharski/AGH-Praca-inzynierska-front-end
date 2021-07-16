import { setupWorker } from 'msw';
import { handlers as userGroupTimetableHandlers } from './handlers/timetableHandlers/userGroupTimetableHandler';
import { handlers as loginHandlers } from './handlers/loginhandlers';

const worker = setupWorker(...userGroupTimetableHandlers, ...loginHandlers);

export { worker };
