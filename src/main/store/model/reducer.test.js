import * as actionTypes from './action/types';
import * as actionsCreators from './action/creators';
import reducer from './reducer';
import { initialStore } from '../initialStore';

describe('State reducer', () => {
   test("should return the initial store's state data.", () => {
      expect(reducer(undefined, {})).toEqual(initialStore.modelData);
   });

   test(`should handle ${actionTypes.ADD_USER} action.`, () => {
      const expectedStore = {
         ...initialStore.modelData,
         users: [{ userId: '123', name: 'Grzegorz', surname: 'Zacharski' }],
      };
      expect(
         reducer(
            initialStore.modelData,
            actionsCreators.addUser({
               userId: '123',
               name: 'Grzegorz',
               surname: 'Zacharski',
            }),
         ),
      ).toEqual(expectedStore);
   });

   test(`should handle ${actionTypes.SET_AVATAR} action.`, () => {
      const expectedStore = {
         ...initialStore.modelData,
         account: {
            ...initialStore.modelData.account,
            avatar: { data: 'testData', format: 'image/jpeg' },
         },
      };
      expect(
         reducer(
            initialStore.modelData,
            actionsCreators.setAvatar({
               data: 'testData',
               format: 'image/jpeg',
            }),
         ),
      ).toEqual(expectedStore);
   });

   test(`should handle ${actionTypes.SET_USER_INFO} action.`, () => {
      const expectedStore = {
         ...initialStore.modelData,
         account: {
            ...initialStore.modelData.account,
            user: {
               id: 'userTestId',
               name: 'TestName',
               surname: 'TestSurname',
            },
         },
      };
      expect(
         reducer(
            initialStore.modelData,
            actionsCreators.setUserInfo({
               userId: 'userTestId',
               name: 'TestName',
               surname: 'TestSurname',
            }),
         ),
      ).toEqual(expectedStore);
   });
});
