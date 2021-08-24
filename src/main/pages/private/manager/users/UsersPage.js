/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { useStyles } from './UsersPage.styles';

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box p={3}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

const AccountPage = () => {
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
                  aria-label="simple tabs example"
               >
                  <Tab label="Klienci" {...a11yProps(0)} />
                  <Tab label="Pracownicy" {...a11yProps(1)} />
                  <Tab label="Trenerzy" {...a11yProps(2)} />
                  <Tab label="Managerowie" {...a11yProps(3)} />
               </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
               Lista klientów
            </TabPanel>
            <TabPanel value={value} index={1}>
               Lista pracowników
            </TabPanel>
            <TabPanel value={value} index={2}>
               Lista trenerów
            </TabPanel>
            <TabPanel value={value} index={3}>
               Lista managerów
            </TabPanel>
         </div>
      </PageWrapper>
   );
};

export default AccountPage;
