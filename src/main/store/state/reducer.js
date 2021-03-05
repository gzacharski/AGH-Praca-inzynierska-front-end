import * as ActionTypes from './action/types';
import { initialStore } from '../initialStore';

export default function reducer(store, action) {
    switch (action.type) {
        case ActionTypes.TOGGLE_DRAWER:
            return {
                ...store,
                stateData:{
                    ...store.stateData,
                    menuIsOpen: !store.stateData.menuIsOpen
                }
            }
        default:
            return store || initialStore;
    }
}