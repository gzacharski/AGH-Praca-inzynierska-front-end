/* eslint-disable no-unused-vars */
import { rest } from 'msw';
import faker from 'faker';
import { accountServiceURL } from 'src/main/data/urls';

const getAbstractUser = (roles) => ({
   userId: faker.datatype.uuid(),
   avatar: faker.internet.avatar(),
   name: faker.name.firstName(),
   surname: faker.name.lastName(),
   email: faker.internet.email(),
   phone: faker.phone.phoneNumber(),
   roles,
   enabled: faker.datatype.boolean(),
});

const getAnyUser = () => {
   const roles = faker.random.arrayElements([
      'user',
      'admin',
      'trainer',
      'employee',
      'manager',
   ]);

   return getAbstractUser(roles);
};

const getTestUser = () => getAbstractUser(['user']);
const getTestTrainer = () => getAbstractUser(['user', 'trainer']);
const getTestManager = () => getAbstractUser(['user', 'manager']);
const getTestEmployee = () => getAbstractUser(['user', 'employee']);

const total = 1000;

export const adminUserHandlers = [
   rest.get(`${accountServiceURL}/admin/all`, (req, res, ctx) => {
      const pageNumber = req.url.searchParams.get('pageNumber');
      const pageSize = req.url.searchParams.get('pageSize');

      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getAnyUser());
         }
         return testRows;
      };
      const users = getRows(total);
      return res(ctx.status(200), ctx.delay(1500), ctx.json(users));
   }),
   rest.get(`${accountServiceURL}/admin/users`, (req, res, ctx) => {
      const pageNumber = req.url.searchParams.get('pageNumber');
      const pageSize = req.url.searchParams.get('pageSize');
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getTestUser());
         }
         return testRows;
      };
      const users = getRows(total);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
   rest.get(`${accountServiceURL}/admin/employees`, (req, res, ctx) => {
      const pageNumber = req.url.searchParams.get('pageNumber');
      const pageSize = req.url.searchParams.get('pageSize');
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getTestEmployee());
         }
         return testRows;
      };
      const users = getRows(7);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
   rest.get(`${accountServiceURL}/admin/manager`, (req, res, ctx) => {
      const pageNumber = req.url.searchParams.get('pageNumber');
      const pageSize = req.url.searchParams.get('pageSize');
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getTestManager());
         }
         return testRows;
      };
      const users = getRows(3);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
   rest.get(`${accountServiceURL}/admin/trainer`, (req, res, ctx) => {
      const pageNumber = req.url.searchParams.get('pageNumber');
      const pageSize = req.url.searchParams.get('pageSize');
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getTestTrainer());
         }
         return testRows;
      };
      const users = getRows(13);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
];
