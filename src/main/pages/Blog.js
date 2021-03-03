import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles({
    root : {
        fontWeight: 'bold',
        padding: '30px'
    }
})

export default function Blog(){
    const classes=useStyles();
    return(
        <Typography variant='h5' className={classes.root} align='center'>
            Blog
        </Typography>
    );
}