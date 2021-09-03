import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
   button: {
      fontSize: '14px',
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
      margin: 'auto',
   },
   select: {
      width: '100%',
   },
   menuItem: {
      display: 'flex',
   },
   avatar: {
      height: spacing(3),
      width: spacing(3),
      marginRight: spacing(1),
   },
}));

export { useStyles };
