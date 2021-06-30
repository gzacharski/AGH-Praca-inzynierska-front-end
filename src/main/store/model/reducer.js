import * as ActionTypes from './action/types';
import { initialStore } from '../initialStore';

export default function reducer(modelData, action) {
   switch (action.type) {
      case ActionTypes.ADD_USER:
         return {
            ...modelData,
            users: modelData.users.concat(action.payload.user),
         };
      case ActionTypes.SET_AVATAR:
         return {
            ...modelData,
            account: {
               ...modelData.account,
               avatar: action.payload.image,
            },
         };
      case ActionTypes.SET_USER_INFO:
         return {
            ...modelData,
            account: {
               ...modelData.account,
               user: action.payload.user,
            },
         };
      default:
         return modelData || initialStore.modelData;
   }
}
