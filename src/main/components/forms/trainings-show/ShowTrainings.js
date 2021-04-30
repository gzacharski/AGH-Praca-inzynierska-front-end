/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { useStyles } from './ShowTrainingsForm.styles';







const ShowTrainings = () => {

    const sendRequest  = () => {
        axios
            .get(`http://localhost:8020/trainings/status`, {
                validateStatus: (status) =>
                (status >= 200 && status < 300) || status === 409,
            })
            .then((response) => {
                console.log("response: ", response.data);
            })
    }



    const classes = useStyles();
    return (
        <form>
            <h1>Hello, there will be offers</h1>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Offers
            </Button>
            
        </form>
    )
    
    };

export default ShowTrainings;
