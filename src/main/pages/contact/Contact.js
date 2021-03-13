import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Contact.styles";

export default function Contact() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" component="main" data-testid="main-container">
      <Typography variant="h5" className={classes.root} align="center">
        Kontakt
      </Typography>
    </Container>
  );
}
