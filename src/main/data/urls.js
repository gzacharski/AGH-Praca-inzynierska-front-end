const protocol = 'http';
const hostname = 'localhost';
const port = 8020;
const accountService = 'account';
const authService = 'auth';
const trainingsService = 'trainings';
const gymPassService = 'gympass';

export const accountServiceURL = `${protocol}://${hostname}:${port}/${accountService}`;
export const authServiceURL = `${protocol}://${hostname}:${port}/${authService}`;
export const trainingsServiceURL = `${protocol}://${hostname}:${port}/${trainingsService}`;
export const apiGateway = `${protocol}://${hostname}:${port}`;

// TODO to fix when back-end is ready
export const gymPassServiceURL = `${protocol}://${hostname}:${port}/${gymPassService}`;
