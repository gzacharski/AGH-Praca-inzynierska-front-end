const protocol = 'http';
const hostname = 'localhost';
const port = 8020;
const userService = 'user';
const trainingsService = 'traininigs';

export const userServiceURL = `${protocol}://${hostname}:${port}/${userService}`;
export const trainingsServiceURL = `${protocol}://${hostname}:${port}/${trainingsService}`;
export const apiGateway = `${protocol}://${hostname}:${port}`;
