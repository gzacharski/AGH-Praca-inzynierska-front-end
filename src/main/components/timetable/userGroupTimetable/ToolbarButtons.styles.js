import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }) => ({
   flexibleSpace: {
      marginBottom: 'auto',
      marginTop: 'auto',
      marginLeft: spacing(2),
      marginRight: 'auto',
   },buttonWrapped: {
      padding: spacing(1),
   },
   button: {
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
   },
}));
