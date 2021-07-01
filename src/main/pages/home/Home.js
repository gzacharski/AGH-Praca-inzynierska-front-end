import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { selectUsersFromUser } from 'src/main/store/selectors';
import { addUser } from 'src/main/store/reducers';
import { useStyles } from './Home.styles';

export default function Home() {
   const classes = useStyles();

   const dispatch = useDispatch();

   const userList = (userss) =>
      userss.map((user) => <h4 key={user}>{user}</h4>);
   const tempUsers = ['Test user'];
   const users = useSelector(selectUsersFromUser);

   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Strona główna
            <br />
            <Button
               variant="contained"
               color="primary"
               onClick={() => dispatch(addUser(tempUsers[0]))}
            >
               Test button
            </Button>
            {users && userList(users)}
         </Typography>
      </Container>
   );
}
