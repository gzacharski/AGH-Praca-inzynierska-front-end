import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import {
   selectUsersFromUser,
   addUser,
} from 'src/main/store/sliceFiles/usersSlice';
import { useStyles } from './Home.styles';

export default function Home() {
   const classes = useStyles();

   const dispatch = useDispatch();

   const userList = (userss) =>
      userss.map((user) => <h4 key={user}>{user}</h4>);
   const tempUsers = ['Test user'];
   const users = useSelector(selectUsersFromUser);

   return (
      <PageWrapper>
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
      </PageWrapper>
   );
}
