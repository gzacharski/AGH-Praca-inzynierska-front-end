import { setupWorker } from 'msw';
import { handlers as accountGroupTimetableHandlers } from './handlers/accountGroupTimetable';

const worker = setupWorker(...accountGroupTimetableHandlers);

export { worker };
