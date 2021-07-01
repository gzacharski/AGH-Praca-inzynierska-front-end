import {
   toggleDrawer,
   toggleDrawerMoreInfo,
} from 'src/main/store/sliceReducers/drawerSlice';
import {
   setAvatar,
   setUserInfo,
} from 'src/main/store/sliceReducers/accountSlice';
import { addUser } from 'src/main/store/sliceReducers/usersSlice';

export { addUser, toggleDrawer, toggleDrawerMoreInfo, setAvatar, setUserInfo };
