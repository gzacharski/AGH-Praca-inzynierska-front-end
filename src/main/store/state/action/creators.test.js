import * as actionTypes from './types';
import * as actionsCreators from './creators';

describe('State actions:', () => {
    test('should create an action to toggle the drawer', () => {
        const expectedAction = { type: actionTypes.TOGGLE_DRAWER }
        expect(actionsCreators.toggleDrawer()).toEqual(expectedAction);
    })
})