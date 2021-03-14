import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { addUser } from "../../store/model/action/creators";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Home.styles";

const Home = (props) => {
  const classes = useStyles();

  const userList = (users) => users.map((user) => <h4>{user}</h4>);
  const tempUsers = ["Test user"];

  return (
    <Container maxWidth="xl" component="main" data-testid="main-container">
      <Typography variant="h5" className={classes.root} align="center">
        Strona główna
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.addUser(tempUsers[0])}
        >
          Test button
        </Button>
        {props.users && userList(props.users)}
      </Typography>
    </Container>
  );
};

const mapStateToProps = (store) => ({ users: store.modelData.users });

const mapDispatchToProps = { addUser };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
