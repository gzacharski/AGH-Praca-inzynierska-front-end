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
      marginTop: theme.spacing(3),
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
      verticalAlign: 'middle',
   },
   headerButtons: {
      display: 'flex',
      justifyContent: 'right',
   },
   title: {
      display: 'block',
      flexDirection: 'column',
      justifyContent: 'center'
   },
}));

export { useStyles };
