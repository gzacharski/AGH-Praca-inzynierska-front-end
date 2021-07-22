import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }) => ({
   flexibleSpace: {
      marginBottom: 'auto',
      marginTop: 'auto',
      marginLeft: spacing(2),
      marginRight: 'auto',
   },
   button: {
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
   },
   wrapper: {
      position: 'relative',
   },
   progress: {
      position: 'absolute',
      top: -5,
      right: -5,
      zIndex: 1,
      color: '#1e88e5',
   },
}));
