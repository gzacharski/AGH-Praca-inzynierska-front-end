import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        fontWeight: 'bold',
        padding: '30px',
        background: "yellow",
        height: '100vh'
    },
    form: {

    },
    heading: {
        fontWeight: 'bold',
        padding: '30px',
        background: "red"
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',

    }
})

export { useStyles };