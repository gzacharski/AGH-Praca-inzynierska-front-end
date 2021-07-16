import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   '@global': {
      ul: {
         margin: 0,
         padding: 0,
         listStyle: 'none',
      },
   },
   cardHeader: {
      backgroundColor:
         theme.palette.type === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
   },
   cardHeaderSkeleton: {
      backgroundColor:
         theme.palette.type === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
      minHeight: '60px',
   },
   cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
   },
   cardPricingSkeleton: {
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
   },
   cardContent: {
      cursor: 'pointer',
   },
   button: {
      borderColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
         borderColor: '#3ea8f5',
         color: 'white',
      },
   },
   buttonPremium: {
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
      color: 'white',
   },
   textSkeleton: {
      margin: 'auto',
   },
   buttonSkeleton: {
      minHeight: '60px',
   },
}));
