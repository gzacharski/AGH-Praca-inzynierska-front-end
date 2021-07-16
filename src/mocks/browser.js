import { setupWorker } from 'msw';
import { handlers as accountGroupTimetableHandlers } from './handlers/accountGroupTimetableHandler';
import { handlers } from './handlers';

const worker = setupWorker(...accountGroupTimetableHandlers, ...handlers);

export { worker };
