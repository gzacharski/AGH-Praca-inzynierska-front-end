import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from 'src/main/store/sliceReducers/drawerSlice';

export default configureStore({
   reducer: {
      drawer: drawerReducer,
   },
});
