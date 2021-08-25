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
import notificationsSlice from 'src/main/store/sliceFiles/notificationsSlice';
import messagesSlice from 'src/main/store/sliceFiles/messagesSlice';
import adminUsersListSlice from 'src/main/store/sliceFiles/adminSlices/usersSlice';
import clientsListSlice from 'src/main/store/sliceFiles/users/clientSlice';
import employeesListSlice from 'src/main/store/sliceFiles/users/employeesSlice';
import managerListSlice from 'src/main/store/sliceFiles/users/managerSlice';
import trainersListSlice from 'src/main/store/sliceFiles/users/trainersSlice';
import locationsSlice from './sliceFiles/locationsSlice';

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
   notifications: notificationsSlice,
   messages: messagesSlice,
   adminUsersList: adminUsersListSlice,
   clientsList: clientsListSlice,
   employeesList: employeesListSlice,
   managersList: managerListSlice,
   trainersList: trainersListSlice,
   locationList: locationsSlice,
};

export default configureStore({ reducer });
