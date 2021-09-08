/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core';
import {
   youngManRunning,
   manRunningOnBeach,
} from 'src/assets/images/background';

export const useStyles = makeStyles({
   root: {
      display: 'flex',
   },
   content: {
      height: '100vh',
      overflow: 'auto',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
   },
   image: {
      backgroundImage: `url(${youngManRunning})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
   },
   imageAuth: {
      backgroundImage: `url(${manRunningOnBeach})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
   },
});
