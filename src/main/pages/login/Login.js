import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { Footer } from "../../layout";
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
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={3}
        xl={2}
        elevation={6}
        component={Paper}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" className={classes.heading} align="center">
            Zaloguj się
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamiętaj mnie"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zaloguj
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Nie pamiętasz hasła?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Utwórz konto"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Footer />
        </div>
      </Grid>
    </Grid>
  );
}
