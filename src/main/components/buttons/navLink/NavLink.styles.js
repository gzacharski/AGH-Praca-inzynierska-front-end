import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   root: {
      fontSize: '14px',
      color: 'white',
      marginLeft: '20px',
      marginRight: '20px',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
   },
});

export { useStyles };
