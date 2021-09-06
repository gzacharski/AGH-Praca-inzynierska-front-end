import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { PageWrapper } from 'src/main/components/utils';
import { useStyles } from './TasksPage.styles';

const AccountPage = () => {
   const classes = useStyles;
   const history = useHistory();
   return (
      <PageWrapper>
         <Typography variant="h5" className={classes.root} align="center">
            Zadania pracowników
         </Typography>
         <div>
            <Button onClick={() => history.push('/manager/tasks/add')}>
               Dodaj nowe zadanie
            </Button>
         </div>
         <div>Przydzielone zadania</div>
      </PageWrapper>
   );
};

export default AccountPage;
