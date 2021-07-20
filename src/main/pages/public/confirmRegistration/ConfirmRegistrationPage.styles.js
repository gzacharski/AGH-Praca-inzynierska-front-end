import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
});

export { useStyles };
