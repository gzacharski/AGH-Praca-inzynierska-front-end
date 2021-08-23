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

export const adminUserHandlers = [
   rest.get(`${accountServiceURL}/admin/all`, (req, res, ctx) => {
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getAnyUser());
         }
         return testRows;
      };
      const users = getRows(100);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
   rest.get(`${accountServiceURL}/admin/users`, (req, res, ctx) => {
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getTestUser());
         }
         return testRows;
      };
      const users = getRows(100);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
   rest.get(`${accountServiceURL}/admin/employee`, (req, res, ctx) => {
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getTestEmployee());
         }
         return testRows;
      };
      const users = getRows(100);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
   rest.get(`${accountServiceURL}/admin/manager`, (req, res, ctx) => {
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getTestManager());
         }
         return testRows;
      };
      const users = getRows(100);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
   rest.get(`${accountServiceURL}/admin/trainers`, (req, res, ctx) => {
      const getRows = (count) => {
         const testRows = [];
         for (let i = 0; i < count; i += 1) {
            testRows.push(getTestTrainer());
         }
         return testRows;
      };
      const users = getRows(100);
      return res(ctx.status(200), ctx.delay(), ctx.json(users));
   }),
];
