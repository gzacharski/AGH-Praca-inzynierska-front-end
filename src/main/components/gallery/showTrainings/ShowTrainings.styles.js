import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   message: {
      fontWeight: 'bold',
      margin: '30px',
      textAlign: 'center',
   },
   containerMessage: {
      height: '50vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
      justifyContent: 'center',
   },
   container: {
      height: '50vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
   },
   loader: {
      height: '50vh',
      display: 'flex',
      marginTop: 'auto',
      marginBottom: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
   },
});

export { useStyles };
