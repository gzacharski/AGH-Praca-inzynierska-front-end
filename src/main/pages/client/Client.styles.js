import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
   },
}));

export { useStyles };
