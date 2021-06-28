import * as actionTypes from './action/types';
import { initialStore } from '../initialStore';

export default function reducer(stateData, action) {
   switch (action.type) {
      case actionTypes.TOGGLE_DRAWER:
         return {
            ...stateData,
            menuIsOpen: !stateData.menuIsOpen,
         };
      case actionTypes.TOGGLE_MENU_MORE_INFO:
         return {
            ...stateData,
            menuMoreInfo: !stateData.menuMoreInfo,
         };
      default:
         return stateData || initialStore.stateData;
   }
}
