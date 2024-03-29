import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   button: {
      fontSize: '14px',
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
      borderRadius: '25px',
   },
   popper: {
      zIndex: theme.zIndex.drawer + 2,
   },
   paper: {
      border: '1px solid',
      borderColor: '#1e88e5',
      borderRadius: '20px',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    }
}));
