import React, { useContext } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { AuthContext } from 'src/main/auth';
import { FilterRenderer } from 'src/main/renderers';
import {
   AdminList,
   ClientList,
   ManagerList,
   PublicList,
   EmployeeList,
   TrainerList,
} from 'src/main/layout/navigation/lists';
import { MenuMoreInfoSwitch } from 'src/main/components/switches';
import { toggleDrawer } from 'src/main/store/state/action/creators';
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
               <Divider />
               <ClientList />
               <Divider />
               <PublicList />
               <Divider />
               <EmployeeList />
               <Divider />
               <TrainerList />
               <Divider />
               <ManagerList />
               <Divider />
               <AdminList />
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
