import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }) => ({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   avatar: {
      width: spacing(4),
      height: spacing(4),
   },
}));
