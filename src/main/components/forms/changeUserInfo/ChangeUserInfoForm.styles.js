import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   form: {
      width: '100%',
   },
   header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
   },
   headerButtons: {
      display: 'flex',
      marginTop: 'auto',
      marginBottom: 'auto',
   },
   paper: {
      minHeight: 200,
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
   },
   title: {
      marginTop: 'auto',
      marginBottom: 'auto',
   },
}));

export { useStyles };
