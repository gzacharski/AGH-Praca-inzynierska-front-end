import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({ spacing }) => ({
   root: {
      display: 'flex',
      borderRadius: '10px',
      cursor: 'pointer',
      width: '100vw',
      maxWidth: '100%',
   },
   rootMarkAsRead: {
      backgroundColor: '#e0e0e0',
      cursor: 'auto',
   },
   rootSkeleton: {
      display: 'flex',
      borderRadius: '10px',
      width: '100vw',
      maxWidth: '100%',
   },
   body: {
      padding: spacing(2),
      minWidth: '100%',
   },
   header: {
      marginTop: 'auto',
      marginBottom: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
   },
   time: {
      display: 'flex',
      direction: 'row',
      fontStyle: 'italic',
      paddingTop: spacing(1),
      paddingBottom: spacing(1),
   },
   content: {
      textAlign: 'justify',
   },
   title: {
      marginBottom: 'auto',
      marginTop: 'auto',
   },
}));
