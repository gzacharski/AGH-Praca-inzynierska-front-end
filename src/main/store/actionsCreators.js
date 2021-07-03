import {
   toggleDrawer,
   toggleDrawerMoreInfo,
} from 'src/main/store/sliceFiles/drawerSlice';
import {
   setAvatar,
   setUserInfo,
} from 'src/main/store/sliceFiles/accountSlice';
import { addUser } from 'src/main/store/sliceFiles/usersSlice';

export { addUser, toggleDrawer, toggleDrawerMoreInfo, setAvatar, setUserInfo };
