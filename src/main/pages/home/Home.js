import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { addUser } from "../../store/model/action/creators";
import { useStyles } from "./Home.styles";

const Home = (props) => {
  const classes = useStyles();

  const userList = (users) => users.map((user) => <h4 key={user}>{user}</h4>);
  const tempUsers = ["Test user"];
  const {users}=props;
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
        {users && userList(users)}
      </Typography>
    </Container>
  );
};

const mapStateToProps = (store) => ({ users: store.modelData.users });

const mapDispatchToProps = { addUser };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
