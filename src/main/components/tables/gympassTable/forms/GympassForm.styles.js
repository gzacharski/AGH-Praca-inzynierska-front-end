import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   avatar: {
      width: spacing(3),
      height: spacing(3),
      marginRight: spacing(1),
   },
   menuItem: {
      display: 'flex',
   },
}));
