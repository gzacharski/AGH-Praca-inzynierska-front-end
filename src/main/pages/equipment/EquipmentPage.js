import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./EquipmentPage.styles";

export default function Blog() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" component="main">
      <Typography variant="h5" className={classes.root} align="center">
        Sprzęt treningowy
      </Typography>
    </Container>
  );
}
