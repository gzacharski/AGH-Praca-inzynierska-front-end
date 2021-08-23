import { makeStyles } from '@material-ui/core';

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
}));
