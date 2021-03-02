import React from "react";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles'

const useStyles=makeStyles({
    root:{
        padding: "50px",
    },
    footer_title:{
        fontWeight: "bold",
    }
})

export default function Footer(){
    const classes=useStyles();
    return(
        <Container maxWidth='xl' component='footer' className={classes.root} data-testid='footer-container' >
            <Typography align='center' component='h6' className={classes.footer_title} data-testid='footer-title'>
                System do wspomagania zarządzania placówką profilaktyki zdrowotnej
            </Typography>
            <Typography align='center' component='p' data-testid='footer-authors'>
                Bartosz Kordek Grzegorz Zacharski
            </Typography>
            <Typography align='center' component='p' data-testid='footer-year'>
                2020/2021
            </Typography>
        </Container>
    );
}