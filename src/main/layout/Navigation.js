import React, { useContext } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import {
   AuthContext,
   withAdminRole,
   withEmployeeRole,
   withManagerRole,
   withTrainerRole,
   withUserRole,
} from 'src/main/auth';
import { FilterRenderer } from 'src/main/renderers';
import {
   AdminList,
   AccountList,
   ManagerList,
   PublicList,
   EmployeeList,
   TrainerList,
} from 'src/main/layout/navigation/lists';
import { MenuMoreInfoSwitch } from 'src/main/components/switches';
import { toggleDrawer } from 'src/main/store/state/action/creators';
import { useStyles } from './Navigation.styles';

const AdminListAuth = () =>
   withAdminRole(() => (
      <>
         <Divider />
         <AdminList />
      </>
   ));

const AccountListAuth = () =>
   withUserRole(() => (
      <>
         <Divider />
         <AccountList />
      </>
   ));

const PublicListAuth = () =>
   withUserRole(() => (
      <>
         <Divider />
         <PublicList />
      </>
   ));

const EmployeeListAuth = () =>
   withEmployeeRole(() => (
      <>
         <Divider />
         <EmployeeList />
      </>
   ));

const TrainerListAuth = () =>
   withTrainerRole(() => (
      <>
         <Divider />
         <TrainerList />
      </>
   ));

const ManagerListAuth = () =>
   withManagerRole(() => (
      <>
         <Divider />
         <ManagerList />
      </>
   ));

const Navigation = (props) => {
   const authContext = useContext(AuthContext);
   const { token } = authContext.authState;
   if (token === null) return null;

   const filteredUrls = [
      '/login',
      '/sign-up',
      '/confirmRegistration',
      '/confirmNewPassword',
   ];

   const classes = useStyles();

   const { menuIsOpen, toggle, menuMoreInfo } = props;

   return (
      <FilterRenderer urls={filteredUrls}>
         <nav>
            <Drawer
               variant="permanent"
               className={clsx({
                  [classes.drawer]: !menuMoreInfo,
                  [classes.drawerMoreInfo]: menuMoreInfo,
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
            >
               <div className={classes.toolbar}>
                  <MenuMoreInfoSwitch />
                  <IconButton onClick={() => toggle()}>
                     {menuIsOpen ? <ChevronLeft /> : <ChevronRight />}
                  </IconButton>
               </div>
               <AccountListAuth />
               <EmployeeListAuth />
               <TrainerListAuth />
               <ManagerListAuth />
               <AdminListAuth />
               <PublicListAuth />
            </Drawer>
         </nav>
      </FilterRenderer>
   );
};

const mapStateToProps = (store) => ({
   menuIsOpen: store.stateData.menuIsOpen,
   menuMoreInfo: store.stateData.menuMoreInfo,
});

const mapDispatchToProps = {
   toggle: toggleDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
