/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const ShowTrainings = () => {

   const [trainings, setTrainings] = useState(null);
   const [success, setSuccess] = useState(true);

   const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });


   const showGroupTrainings = () => {
      console.log('request: ');
      axios
         .get(`${trainingsServiceURL}/group`, {
            validateStatus: (status) =>
               (status >= 200 && status < 300) || status === 409,
         })
         .then((response) => {
            console.log('response: ', response.data);
            setTrainings(response.data);
         })
         .catch((error) => {
            console.log(error);
            setSuccess(false);
         });
   };

   const classes = useStyles();
   const showTrainings = () =>
      
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nazwa treningu</TableCell>
              <TableCell align="left">Trener</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Godzina rozpoczęcia</TableCell>
              <TableCell align="center">Godzina zakończenia</TableCell>
              <TableCell align="center">Sala</TableCell>
              <TableCell align="center">Limit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainings.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.trainingName}</TableCell>
                <TableCell align="left">{row.trainerId}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.startTime}</TableCell>
                <TableCell align="center">{row.endTime}</TableCell>
                <TableCell align="center">{row.hallNo}</TableCell>
                <TableCell align="center">{row.limit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>;

       return (
          <div>
             <h2>Oferta zajęć grupowych</h2>
             <div>{trainings && showTrainings()}</div>
               {showGroupTrainings()}
          </div>
       );
    };


export default ShowTrainings;







