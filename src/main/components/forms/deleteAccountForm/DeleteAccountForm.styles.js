import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   paper: {
      minHeight: 200,
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
   },
   header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
   },
   title: {
      marginTop: 'auto',
      marginBottom: 'auto',
   },
   content: {
      padding: theme.spacing(1),
      display: 'block',
   },
   buttonWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
   },
   button: {
      fontSize: '14px',
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
      borderRadius: '25px',
      margin: 'auto',
   },
   dialogButton: {
      fontSize: '14px',
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
      margin: 'auto',
   },
}));
