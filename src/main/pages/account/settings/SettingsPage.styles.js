import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      fontWeight: 'bold',
   },
   content: {
      display: 'flex',
      overflow: 'autos',
   },
   paper: {
      minHeight: 200,
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
   },
}));
