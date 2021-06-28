import * as actionTypes from './types';
import * as actionsCreators from './creators';

describe('State actions:', () => {
   test('should create an action to toggle the drawer', () => {
      const expectedAction = { type: actionTypes.TOGGLE_DRAWER };
      expect(actionsCreators.toggleDrawer()).toEqual(expectedAction);
   });

   test('should create an action to toggle more info in the drawer', () => {
      const expectedAction = { type: actionTypes.TOGGLE_MENU_MORE_INFO };
      expect(actionsCreators.toggleMenuMoreInfo()).toEqual(expectedAction);
   });
});
