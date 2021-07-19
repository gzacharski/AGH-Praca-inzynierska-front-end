import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   button: {
      fontSize: '14px',
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
      margin: 'auto',
   },
   content: {
      margin: 'auto',
   },
});

export { useStyles };
