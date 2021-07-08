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
      verticalAlign: 'middle',
   },
   headerButtons: {
      display: 'flex',
      justifyContent: 'right',
   },
   title: {
      display: 'block',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(2),
   },
   form: {
      width: '100%',
   },
   input: {
      display: 'none',
   },
   icon: {
      color: '#1e88e5',
   },
}));
