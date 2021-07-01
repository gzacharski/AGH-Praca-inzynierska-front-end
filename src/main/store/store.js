import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from 'src/main/store/sliceReducers/drawerSlice';
import accountReducer from 'src/main/store/sliceReducers/accountSlice';

export default configureStore({
   reducer: {
      drawer: drawerReducer,
      account: accountReducer,
   },
});
