import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   paper: {
      border: '1px solid',
      borderColor: '#1e88e5',
      borderRadius: '20px',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
   },
}));
