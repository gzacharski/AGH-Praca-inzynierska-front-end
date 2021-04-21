import { makeStyles } from '@material-ui/core/styles';
import { originalImages } from 'src/assets/images/login-page';

const randomImageNumber = Math.floor(Math.random() * originalImages.length);
const backgroundImage = originalImages[randomImageNumber];

const useStyles = makeStyles((theme) => ({
   root: {
      fontWeight: 'bold',
      height: '100vh',
   },
   heading: {
      fontWeight: 'bold',
      padding: '30px',
   },
   image: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
   },
   paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#1e88e5',
   },
   form: {
      width: '100%',
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#1e88e5',
   },
   footer: {
      marginTop: 'auto',
   },
}));

export { useStyles };
