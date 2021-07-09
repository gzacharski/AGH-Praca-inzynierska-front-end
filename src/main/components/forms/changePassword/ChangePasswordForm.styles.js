import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
      background: 'yellow',
      height: '100vh',
   },
   form: {
      width: '100%',
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
   },
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
      padding: theme.spacing(1)
   },
   headerButtons: {
      marginTop: 'auto',
      marginBottom: 'auto',
   },
   title: {
      marginTop: 'auto',
      marginBottom: 'auto',
   },
   icon: {
      color: '#1e88e5',
   },
}));

export { useStyles };
