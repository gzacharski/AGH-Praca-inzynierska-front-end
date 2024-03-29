import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      margin: 'auto',
   },
   huge: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      margin: 'auto',
   },
}));
