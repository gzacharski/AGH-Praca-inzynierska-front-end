import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 15,
   },
   cardContent: {
      flexGrow: 1,
   },
   box: {
      display: 'flex',
      justifyContent: 'space-between',
   },
   iconSkeleton: {
      height: '40px',
      width: '40px',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
   },
   grid: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
   },
   skeletonChip: {
      height: '25px',
      borderRadius: '25px',
   },
   icons: {
      display: 'flex',
   },
}));
