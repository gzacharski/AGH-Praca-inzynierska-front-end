import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./Login.styles";

export default function Login() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        lg={9}
        xl={10}
        className={classes.image}
      />
      <Grid item xs={12} sm={8} md={5} lg={3} xl={2} elevation={6}>
        <Typography variant="h5" className={classes.heading} align="center">
          Zaloguj się
        </Typography>
        <form className={classes.form}>
          <TextField
            id="outlined-email"
            label="Email"
            required
            variant="outlined"
          />
        </form>
      </Grid>
    </Grid>
  );
}
