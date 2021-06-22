import React, { useContext } from 'react';
import clsx from 'clsx';
import { Redirect } from 'react-router-dom';
import {
   // AppBar,
   Container,
   CssBaseline,
   Drawer,
   Divider,
   IconButton,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Typography,
   // Toolbar,
} from '@material-ui/core';
import {
   // Menu,
   ChevronLeft,
   ChevronRight,
   MoveToInbox,
   Mail,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { AuthContext } from 'src/main/auth';
import { useStyles } from './Client.styles';

const Client = () => {
   const classes = useStyles();
   return (
      <Container maxWidth="xl" component="main" data-testid="main-container">
         <Typography variant="h5" className={classes.root} align="center">
            Strona prywatna klienta
         </Typography>
      </Container>
   );
};

const MiniDrawer = () => {
   const classes = useStyles();
   const theme = useTheme();
   const [open, setOpen] = React.useState(false);

   // const handleDrawerOpen = () => {
   //    setOpen(true);
   // };

   const handleDrawerClose = () => {
      setOpen(false);
   };

   return (
      <div className={classes.root}>
         <CssBaseline />
         {/* <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
               [classes.appBarShift]: open,
            })}
         >
            <Toolbar>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                     [classes.hide]: open,
                  })}
               >
                  <Menu />
               </IconButton>
               <Typography variant="h6" noWrap>
                  Mini variant drawer
               </Typography>
            </Toolbar>
         </AppBar> */}
         <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
               [classes.drawerOpen]: open,
               [classes.drawerClose]: !open,
            })}
            classes={{
               paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
               }),
            }}
         >
            <div className={classes.toolbar}>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                     <ChevronRight />
                  ) : (
                     <ChevronLeft />
                  )}
               </IconButton>
            </div>
            <Divider />
            <List>
               {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                  (text, index) => (
                     <ListItem button key={text}>
                        <ListItemIcon>
                           {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                     </ListItem>
                  ),
               )}
            </List>
            <Divider />
            <List>
               {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                     <ListItemIcon>
                        {index % 2 === 0 ? <MoveToInbox /> : <Mail />}
                     </ListItemIcon>
                     <ListItemText primary={text} />
                  </ListItem>
               ))}
            </List>
         </Drawer>
         <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
               eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Rhoncus dolor purus non enim praesent elementum facilisis leo
               vel. Risus at ultrices mi tempus imperdiet. Semper risus in
               hendrerit gravida rutrum quisque non tellus. Convallis convallis
               tellus id interdum velit laoreet id donec ultrices. Odio morbi
               quis commodo odio aenean sed adipiscing. Amet nisl suscipit
               adipiscing bibendum est ultricies integer quis. Cursus euismod
               quis viverra nibh cras. Metus vulputate eu scelerisque felis
               imperdiet proin fermentum leo. Mauris commodo quis imperdiet
               massa tincidunt. Cras tincidunt lobortis feugiat vivamus at
               augue. At augue eget arcu dictum varius duis at consectetur
               lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
               sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
               Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
               ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
               elementum integer enim neque volutpat ac tincidunt. Ornare
               suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
               volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
               Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
               ornare massa eget egestas purus viverra accumsan in. In hendrerit
               gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
               aliquam sem et tortor. Habitant morbi tristique senectus et.
               Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
               aenean euismod elementum nisi quis eleifend. Commodo viverra
               maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
               aliquam ultrices sagittis orci a.
            </Typography>
         </main>
      </div>
   );
};

export default function AuthClient() {
   const authContext = useContext(AuthContext);
   const { token } = authContext.authState;
   return (
      <>
         {token === null && <Redirect to="/login" />}
         <Client />
         <MiniDrawer/>
      </>
   );
}
