import * as actionTypes from './types';
import * as actionsCreators from './creators';

describe('State actions:', () => {
   test('should create an action to add user', () => {
      const expectedAction = {
         type: actionTypes.ADD_USER,
         payload: {
            user: { id: 'testId', name: 'TestName', surname: 'TestSurname' },
         },
      };
      expect(
         actionsCreators.addUser({
            id: 'testId',
            name: 'TestName',
            surname: 'TestSurname',
         }),
      ).toEqual(expectedAction);
   });

   test('should create an action to set user info', () => {
      const expectedAction = {
         type: actionTypes.SET_USER_INFO,
         payload: {
            user: { id: 'testId', name: 'TestName', surname: 'TestSurname' },
         },
      };
      expect(
         actionsCreators.setUserInfo({
            userId: 'testId',
            name: 'TestName',
            surname: 'TestSurname',
         }),
      ).toEqual(expectedAction);
   });

   test('should create an action to set user avatar', () => {
      const expectedAction = {
         type: actionTypes.SET_AVATAR,
         payload: {
            image: { data: 'testData', format: 'image/jpeg' },
         },
      };
      expect(
         actionsCreators.setAvatar({ data: 'testData', format: 'image/jpeg' }),
      ).toEqual(expectedAction);
   });
});
