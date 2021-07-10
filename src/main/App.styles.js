import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
   root: {
      display: 'flex',
   },
   content: {
      height: '100vh',
      overflow: 'auto',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
   },
});
