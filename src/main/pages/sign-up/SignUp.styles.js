import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      fontWeight: 'bold',
      height: '100vh',
   },
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#1e88e5',
   },
   heading: {
      fontWeight: 'bold',
      padding: '30px',
   },
}));

export { useStyles };
