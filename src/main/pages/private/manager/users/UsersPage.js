/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import {
   ClientsSubpage,
   EmployeesSubpage,
   ManagersSubpage,
   TrainersSubpage,
} from './subpages';
import { useStyles } from './UsersPage.styles';

const TabPanel = (props) => {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && <div>{children}</div>}
      </div>
   );
};

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

const UsersPage = () => {
   const classes = useStyles;
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <PageWrapper>
         <PageTitle>Użytkownicy w systemie</PageTitle>
         <div className={classes.root}>
            <AppBar position="static" color="transparent">
               <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
               >
                  <Tab label="Klienci" {...a11yProps(0)} />
                  <Tab label="Pracownicy" {...a11yProps(1)} />
                  <Tab label="Trenerzy" {...a11yProps(2)} />
                  <Tab label="Managerowie" {...a11yProps(3)} />
               </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
               <ClientsSubpage />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <EmployeesSubpage />
            </TabPanel>
            <TabPanel value={value} index={2}>
               <TrainersSubpage />
            </TabPanel>
            <TabPanel value={value} index={3}>
               <ManagersSubpage />
            </TabPanel>
         </div>
      </PageWrapper>
   );
};

export default UsersPage;
