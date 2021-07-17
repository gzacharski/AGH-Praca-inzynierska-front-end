import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
         backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
   },
}));

export { useStyles };
