import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
   button: {
      fontSize: '14px',
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
      borderRadius: '25px',
   },
   skeleton: {
      margin: '3px',
      minWidth: '30px',
      minHeight: '30px',
      borderRadius: '10px',
   },
});
