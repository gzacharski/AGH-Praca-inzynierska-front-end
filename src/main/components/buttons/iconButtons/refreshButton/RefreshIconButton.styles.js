import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
   button: {
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
   },
   progress: {
      position: 'absolute',
      top: -5,
      right: -5,
      zIndex: 1,
      color: '#1e88e5',
   },
   wrapper: {
      position: 'relative',
   },
});
