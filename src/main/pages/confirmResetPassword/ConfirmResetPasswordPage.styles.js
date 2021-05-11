import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      fontWeight: 'bold',
      height: '100vh',
   },
   paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '30vh',
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#1e88e5',
   },
   avatar200: {
      margin: theme.spacing(1),
      backgroundColor: '#8bc34a',
   },
   avatar400: {
      margin: theme.spacing(1),
      backgroundColor: '#ffc107',
   },
   avatar500: {
      margin: theme.spacing(1),
      backgroundColor: '#ab003c',
   },
   activatButton: {
      margin: '30px',
   },
   message: {
      margin: '30px',
      textAlign: 'center',
   },
   heading: {
      fontWeight: 'bold',
      margin: '30px',
   },
}));

export { useStyles };
