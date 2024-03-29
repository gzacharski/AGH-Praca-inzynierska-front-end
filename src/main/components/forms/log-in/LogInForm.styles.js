import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   form: {
      width: '100%',
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
   },
}));

export { useStyles };
