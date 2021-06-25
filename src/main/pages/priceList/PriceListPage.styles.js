import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   pageTitle: {
      padding: theme.spacing(8, 0, 6),
   },
   message: {
      fontWeight: 'bold',
      margin: '30px',
      textAlign: 'center',
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
}));

export { useStyles };
