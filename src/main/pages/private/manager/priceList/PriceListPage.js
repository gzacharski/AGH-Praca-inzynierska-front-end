/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Tabs, Tab, AppBar, Paper } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import {
   TrainingTypeSubpage,
   LocationsSubpage,
   GympassesSubpage,
} from './subpages';
import { useStyles } from './PriceListPage.styles';

const TabPanel = (props) => {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`tabpanel-${index}`}
         aria-labelledby={`tab-${index}`}
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
            <Paper>
               <AppBar position="static" color="transparent">
                  <Tabs
                     value={value}
                     onChange={handleChange}
                     aria-label="simple tabs example"
                     indicatorColor="primary"
                     textColor="primary"
                     centered
                  >
                     <Tab label="Typy treningów" {...a11yProps(0)} />
                     <Tab label="Sale treningowe" {...a11yProps(1)} />
                     <Tab label="Karnety" {...a11yProps(2)} />
                  </Tabs>
               </AppBar>
            </Paper>
            <TabPanel value={value} index={0}>
               <TrainingTypeSubpage />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <LocationsSubpage />
            </TabPanel>
            <TabPanel value={value} index={2}>
               <GympassesSubpage />
            </TabPanel>
         </div>
      </PageWrapper>
   );
};

export default AccountPage;
