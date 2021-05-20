
import React from "react";
import { ShowTrainings } from 'src/main/components/forms';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Offer.styles";



export default function Offer() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" component="main" data-testid="main-container">
      <Typography variant="h5" className={classes.root} align="center">
        Oferta
      </Typography>
      <ShowTrainings/>
    </Container>
  );
}
