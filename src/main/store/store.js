import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from 'src/main/store/sliceReducers/drawerSlice';
import accountReducer from 'src/main/store/sliceReducers/accountSlice';
import userReducer from 'src/main/store/sliceReducers/usersSlice';

export const reducer = {
   drawer: drawerReducer,
   account: accountReducer,
   users: userReducer,
};

export default configureStore({ reducer });
