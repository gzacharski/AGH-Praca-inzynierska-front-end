import * as ActionTypes from './types';

export const addUser = (user) => ({
   type: ActionTypes.ADD_USER,
   payload: {
      user,
   },
});

export const setUserInfo = ({ userId, name, surname }) => ({
   type: ActionTypes.SET_USER_INFO,
   payload: {
      user: { id: userId, name, surname },
   },
});

export const setAvatar = ({ data, format }) => ({
   type: ActionTypes.SET_AVATAR,
   payload: {
      image: { data, format },
   },
});
