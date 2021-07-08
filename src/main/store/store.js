import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from 'src/main/store/sliceFiles/drawerSlice';
import accountReducer from 'src/main/store/sliceFiles/accountSlice';
import userReducer from 'src/main/store/sliceFiles/usersSlice';
import avatarReducer from 'src/main/store/sliceFiles/avatarSlice';

export const reducer = {
   drawer: drawerReducer,
   account: accountReducer,
   users: userReducer,
   avatar: avatarReducer,
};

export default configureStore({ reducer });
