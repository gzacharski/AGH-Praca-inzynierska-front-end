import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from 'src/main/store/sliceFiles/drawerSlice';
import accountReducer from 'src/main/store/sliceFiles/accountSlice';
import userReducer from 'src/main/store/sliceFiles/usersSlice';
import avatarReducer from 'src/main/store/sliceFiles/avatarSlice';
import agreementSlice from 'src/main/store/sliceFiles/agreementSlice';
import timetableSlice from 'src/main/store/sliceFiles/timetable/timetableSlice';
import trainerSlice from 'src/main/store/sliceFiles/timetable/trainerSlice';
import priceListSlice from 'src/main/store/sliceFiles/priceListSlice';
import userGroupReservationSlice from 'src/main/store/sliceFiles/timetable/userGroupReservationSlice';
import userIndividualReservationSlice from 'src/main/store/sliceFiles/timetable/userIndividualReservationSlice';
import userEquipmentReservationSlice from 'src/main/store/sliceFiles/timetable/userEquipmentReservationSlice';
import trainerListSlice from 'src/main/store/sliceFiles/trainerListSlice';
import equipmentListSlice from 'src/main/store/sliceFiles/equipmentSlice';
import workoutListSlice from 'src/main/store/sliceFiles/workoutSlice';

export const reducer = {
   drawer: drawerReducer,
   account: accountReducer,
   users: userReducer,
   avatar: avatarReducer,
   agreements: agreementSlice,
   timetable: timetableSlice,
   trainer: trainerSlice,
   userGroupReservation: userGroupReservationSlice,
   userIndividualReservation: userIndividualReservationSlice,
   userEquipmentReservation: userEquipmentReservationSlice,
   trainerList: trainerListSlice,
   equipmentList: equipmentListSlice,
   priceList: priceListSlice,
   workoutList: workoutListSlice,
};

export default configureStore({ reducer });
