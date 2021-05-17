const protocol = 'http';
const hostname = 'localhost';
const port = 8020;
const accountService = 'account';
const authService = 'auth';

export const accountServiceURL = `${protocol}://${hostname}:${port}/${accountService}`;
export const authServiceURL = `${protocol}://${hostname}:${port}/${authService}`;
export const apiGateway = `${protocol}://${hostname}:${port}`;
