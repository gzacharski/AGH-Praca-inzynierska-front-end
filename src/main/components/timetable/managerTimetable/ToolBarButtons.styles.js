import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }) => ({
   flexibleSpace: {
      display: 'flex',
      marginBottom: 'auto',
      marginTop: 'auto',
      marginLeft: spacing(2),
      marginRight: 'auto',
   },
   buttonWrapped: {
      padding: spacing(1),
   },
}));
