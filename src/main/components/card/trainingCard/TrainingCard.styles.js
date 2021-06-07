import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   box: {
      display: 'flex',
      justifyContent: 'space-between'
   },
   card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 15,
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
         transform: 'scale(1.05)',
      },
   },
   cardMedia: {
      paddingTop: '75%',
   },
   cardContent: {
      flexGrow: 1,
   },
   typography: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxLines: 3,
      lineHeight: '1.4rem',
      maxHeight: 200,
   },
});

export { useStyles };
