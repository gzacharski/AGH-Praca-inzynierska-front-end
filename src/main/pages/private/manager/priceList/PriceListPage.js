/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography, Tabs, Tab, AppBar, Box } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { TrainingTypeSubpage } from './subpages';
import { useStyles } from './PriceListPage.styles';

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
         <PageTitle>Modyfikuj ofertę</PageTitle>
         <div className={classes.root}>
            <AppBar position="static" color="transparent">
               <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
               >
                  <Tab label="Typy treningów" {...a11yProps(0)} />
                  <Tab label="Sale treningowe" {...a11yProps(1)} />
                  <Tab label="Sprzęt fitness" {...a11yProps(2)} />
                  <Tab label="Karnety" {...a11yProps(3)} />
               </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
               <TrainingTypeSubpage />
            </TabPanel>
            <TabPanel value={value} index={1}>
               Sale treningowe
            </TabPanel>
            <TabPanel value={value} index={2}>
               Sprzęt fitness
            </TabPanel>
            <TabPanel value={value} index={3}>
               Karnety
            </TabPanel>
         </div>
      </PageWrapper>
   );
};

export default AccountPage;
