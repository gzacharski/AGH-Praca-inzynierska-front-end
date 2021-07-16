import { setupWorker } from 'msw';
import { handlers as accountGroupTimetableHandlers } from './handlers/accountGroupTimetableHandler';

const worker = setupWorker(...accountGroupTimetableHandlers);

export { worker };
