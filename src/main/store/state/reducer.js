import * as actionTypes from './action/types';
import { initialStore } from '../initialStore';

export default function reducer(stateData, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_DRAWER:
            return {
                    ...stateData,
                    menuIsOpen: !stateData.menuIsOpen
                }
        default:
            return stateData || initialStore.stateData;
    }
}