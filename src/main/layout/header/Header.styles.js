import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: '#1e88e5',
   },
   toolbar: {
      justifyContent: 'space-between',
   },
   mainNavlinks :{
      justifyContent: 'center',
   },
   appBar: {
      backgroundColor: '#1e88e5',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
   },
   appBarShift: {
      backgroundColor: '#1e88e5',
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
}));

export { useStyles };
