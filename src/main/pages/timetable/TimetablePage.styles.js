import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   paper: {
      padding: theme.spacing(2),
   },
}));

export { useStyles };
