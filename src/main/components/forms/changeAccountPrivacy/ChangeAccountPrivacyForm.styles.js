import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      fontWeight: 'bold',
      padding: theme.spacing(2),
   },
   rootMinimized: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      fontWeight: 'bold',
      padding: theme.spacing(2),
   },
   content: {
      display: 'flex',
      overflow: 'auto',
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
   header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
   },
   headerButtons: {
      marginTop: 'auto',
      marginBottom: 'auto',
   },
   accordionDetails: {
      alignContent: 'center',
      flexDirection: 'column',
   },
   paragraph: {
      margin: '5px',
   },
   icon: {
      color: '#1e88e5',
   },
}));
