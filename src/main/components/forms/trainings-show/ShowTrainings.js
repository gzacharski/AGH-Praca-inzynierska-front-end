/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from './ShowTrainingsForm.styles';


const ShowTrainings = () => {
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
