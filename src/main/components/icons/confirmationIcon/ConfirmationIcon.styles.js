import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
}));

export { useStyles };
