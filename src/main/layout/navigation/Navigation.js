import React, { useContext } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import {
   selectDrawer,
   selectDrawerMoreInfo,
   toggleDrawer,
} from 'src/main/store/sliceFiles/drawerSlice';
import {
   AuthContext,
   OnlyWithAdminRole,
   OnlyWithEmployeeRole,
   OnlyWithManagerRole,
   OnlyWithTrainerRole,
   OnlyWithUserRole,
} from 'src/main/auth';
import { FilterRenderer } from 'src/main/components/utils';
import {
   AdminList,
   AccountList,
   ManagerList,
   PublicList,
   EmployeeList,
   TrainerList,
} from 'src/main/layout/navigation/lists';
import { MenuMoreInfoSwitch } from 'src/main/components/switches';
import { filteredUrls } from 'src/main/data/filteredUrls';
import { useStyles } from './Navigation.styles';

const Navigation = () => {
   const dispatch = useDispatch();
   const menuIsOpen = useSelector(selectDrawer);
   const menuMoreInfo = useSelector(selectDrawerMoreInfo);
   const authContext = useContext(AuthContext);
   const classes = useStyles();

   const { token } = authContext.authState;

   return (
      token && (
         <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
               [classes.drawerOpen]: menuIsOpen,
               [classes.drawerClose]: !menuIsOpen,
            })}
            classes={{
               paper: clsx({
                  [classes.drawerMoreInfo]: menuMoreInfo,
                  [classes.drawerOpen]: menuIsOpen,
                  [classes.drawerClose]: !menuIsOpen,
               }),
            }}
            open={menuIsOpen}
            data-testid="navigation"
         >
            <div className={classes.toolbar}>
               <MenuMoreInfoSwitch />
               <IconButton onClick={() => dispatch(toggleDrawer())}>
                  {menuIsOpen ? <ChevronLeft /> : <ChevronRight />}
               </IconButton>
            </div>
            <OnlyWithUserRole>
               <Divider />
               <AccountList />
            </OnlyWithUserRole>
            <OnlyWithEmployeeRole>
               <Divider />
               <EmployeeList />
            </OnlyWithEmployeeRole>
            <OnlyWithTrainerRole>
               <Divider />
               <TrainerList />
            </OnlyWithTrainerRole>
            <OnlyWithManagerRole>
               <Divider />
               <ManagerList />
            </OnlyWithManagerRole>
            <OnlyWithAdminRole>
               <Divider />
               <AdminList />
            </OnlyWithAdminRole>
            <OnlyWithUserRole>
               <Divider />
               <PublicList />
            </OnlyWithUserRole>
         </Drawer>
      )
   );
};

const NavigationFiltered = () => (
   <FilterRenderer urls={filteredUrls}>
      <Navigation />
   </FilterRenderer>
);

export default NavigationFiltered;
