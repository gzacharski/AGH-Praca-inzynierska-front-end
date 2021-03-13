import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";

const useStyles=makeStyles({
    root : {
        fontWeight: 'bold',
        padding: '30px'
    }
})

export default function News(){
    const classes=useStyles();
    return(
        <Container maxWidth='xl' component='main' data-testid='main-container'>
        <Typography variant='h5' className={classes.root} align='center'>
            Aktualności
        </Typography>
        </Container>
    );
}