import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles((theme) => ({
   root: {
      width: '80%',
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
      overflow: 'autos'
   },
   paper: {
      minHeight: 200,
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
   },
   title: {
      fontWeight: 'bold',
      padding: theme.spacing(1),
   },
}));
