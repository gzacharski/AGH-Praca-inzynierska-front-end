import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
   box: {
      display: 'flex',
      justifyContent: 'space-between',
   },
   card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 15,
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
      paddingBottom: spacing(1),
      paddingTop: spacing(1),
      fontStyle: 'oblique',
   },
   descriptionFull: {
      textAlign: 'justify',
      paddingBottom: spacing(1),
      paddingTop: spacing(1),
   },
   trainerName: {
      marginTop: 'auto',
      marginBottom: 'auto',
   },
   grid: {
      paddingBottom: spacing(1),
      paddingTop: spacing(1),
   },
   icons: {
      display: 'flex',
   },
   icon: {
      paddingLeft: spacing(0.5),
      paddingRight: spacing(0.5),
   },
}));

export { useStyles };
