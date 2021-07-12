import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from 'src/main/store/sliceFiles/drawerSlice';
import accountReducer from 'src/main/store/sliceFiles/accountSlice';
import userReducer from 'src/main/store/sliceFiles/usersSlice';
import avatarReducer from 'src/main/store/sliceFiles/avatarSlice';
import agreementSlice from 'src/main/store/sliceFiles/agreementSlice';
import timetableSlice from 'src/main/store/sliceFiles/timetable/timetableSlice';

export const reducer = {
   drawer: drawerReducer,
   account: accountReducer,
   users: userReducer,
   avatar: avatarReducer,
   agreements: agreementSlice,
   timetable: timetableSlice,
};

export default configureStore({ reducer });
