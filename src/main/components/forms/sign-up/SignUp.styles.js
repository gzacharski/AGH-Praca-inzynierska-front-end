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
   },
}));

export { useStyles };
