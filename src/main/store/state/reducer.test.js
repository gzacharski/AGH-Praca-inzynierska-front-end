import * as actionTypes from './action/types';
import * as actionsCreators from './action/creators';
import reducer from './reducer';
import { initialStore } from '../initialStore';

describe('State reducer', () => {
   test("should return the initial store's state data.", () => {
      expect(reducer(undefined, {})).toEqual(initialStore.stateData);
   });

   test(`should handle ${actionTypes.TOGGLE_DRAWER} action.`, () => {
      const expectedStore = {
         ...initialStore.stateData,
         menuIsOpen: !initialStore.stateData.menuIsOpen,
      };
      expect(
         reducer(initialStore.stateData, actionsCreators.toggleDrawer()),
      ).toEqual(expectedStore);
   });

   test(`should handle ${actionTypes.TOGGLE_MENU_MORE_INFO} action.`, () => {
      const expectedStore = {
         ...initialStore.stateData,
         menuMoreInfo: !initialStore.stateData.mmenuMoreInfo,
      };
      expect(
         reducer(initialStore.stateData, actionsCreators.toggleMenuMoreInfo()),
      ).toEqual(expectedStore);
   });
});
