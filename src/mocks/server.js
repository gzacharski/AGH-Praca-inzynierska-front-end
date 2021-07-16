import { setupServer } from 'msw/node';
import { handlers } from './handlers/loginhandlers';

const server = setupServer(...handlers);

export { server };
