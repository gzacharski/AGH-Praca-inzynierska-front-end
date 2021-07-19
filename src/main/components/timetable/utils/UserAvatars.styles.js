import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   group: {
      '&:hover': {
         cursor: 'pointer',
      },
   },
   grid: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
   },
}));
