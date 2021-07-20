import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
   },
   box: {
      display: 'flex',
      justifyContent: 'space-between',
   },
   card: {
      position: 'fixed',
      height: '750px',
      width: '800px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 30,
   },
   cardMedia: {
      paddingTop: '60%',
   },
   close: {
      position: 'absolute',
      cursor: 'pointer',
      top: '16px',
      right: '16px',
      background: 'white',
      '&:hover': {
         background: '#dddddd',
      },
   },
   description: {
      paddingTop: '20px',
      textAlign: 'justify',
   },
   button: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: '100px',
      paddingRight: '100px',
   },
}));

export { useStyles };
