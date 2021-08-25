import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
   root: {
      flexGrow: 1,
      fontWeight: 'bold',
      padding: '30px',
   },
   tab: {
      '& .MuiTabPanel-root': {
         padding: '0px',
      },
   },
});
