import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   root: {
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
   },
});

export { useStyles };
