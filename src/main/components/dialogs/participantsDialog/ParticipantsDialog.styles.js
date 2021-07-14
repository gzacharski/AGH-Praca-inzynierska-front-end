import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   dialog: {
      display: 'flex',
   },
   closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
   },
}));
