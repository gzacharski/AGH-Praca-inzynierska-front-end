import React, { useContext } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { AuthContext } from 'src/main/auth';
import { FilterRenderer } from 'src/main/renderers';
import {
   AdminList,
   ClientList,
   ManagerList,
   PublicList,
   ReceptionEmployeeList,
   TrainerList,
} from 'src/main/layout/navigation/lists';
import { toggleDrawer } from '../store/state/action/creators';
import { useStyles } from './Navigation.styles';

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
   const theme = useTheme();

   const { menuIsOpen, toggle } = props;

   return (
      <FilterRenderer urls={filteredUrls}>
         <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
               [classes.drawerOpen]: menuIsOpen,
               [classes.drawerClose]: !menuIsOpen,
            })}
            classes={{
               paper: clsx({
                  [classes.drawerOpen]: menuIsOpen,
                  [classes.drawerClose]: !menuIsOpen,
               }),
            }}
         >
            <div className={classes.toolbar}>
               <IconButton onClick={() => toggle()}>
                  {theme.direction === 'rtl' ? (
                     <ChevronRight />
                  ) : (
                     <ChevronLeft />
                  )}
               </IconButton>
            </div>
            <Divider />
            <ClientList />
            <Divider />
            <PublicList />
            <Divider />
            <ReceptionEmployeeList />
            <Divider />
            <TrainerList />
            <Divider />
            <ManagerList />
            <Divider />
            <AdminList />
         </Drawer>
      </FilterRenderer>
   );
};

const mapStateToProps = (store) => ({ menuIsOpen: store.stateData.menuIsOpen });

const mapDispatchToProps = { toggle: toggleDrawer };

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
