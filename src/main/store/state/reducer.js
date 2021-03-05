import * as ActionTypes from './action/types';
import { initialStore } from '../initialStore';

export default function reducer(stateData, action) {
    switch (action.type) {
        case ActionTypes.TOGGLE_DRAWER:
            return {
                    ...stateData,
                    menuIsOpen: !stateData.menuIsOpen
                }
        default:
            return stateData || initialStore.stateData;
    }
}