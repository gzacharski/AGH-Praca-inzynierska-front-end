import { makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

export const useStyles = makeStyles(({ spacing }) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   paper: {
      minHeight: '150px',
      padding: spacing(3),
      borderRadius: '10px',
   },
   singleInstance: {
      padding: spacing(2),
   },
   instanceUp: {
      color: green[500],
   },
   instanceDown: {
      color: red[500],
   },
   timeAgo: {
      marginLeft: spacing(3),
      fontStyle: 'italic'
   },
}));
