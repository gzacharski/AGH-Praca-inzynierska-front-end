import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./About.styles";

export default function About() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" component="main" data-testid="main-container">
      <Typography variant="h5" className={classes.root} align="center">
        O nas
      </Typography>
    </Container>
  );
}
