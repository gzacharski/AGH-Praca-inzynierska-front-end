import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/main/auth';
import { store } from 'src/main/store';
import { Footer, Header, Navigation, Page } from 'src/main/layout';
import { useStyles } from './App.styles';

const App = () => {
   const classes = useStyles();
   return (
      <SnackbarProvider maxSnack={4}>
         <Router basename={process.env.PUBLIC_URL}>
            <AuthProvider>
               <Provider store={store}>
                  <div className={classes.root}>
                     <CssBaseline />
                     <Header />
                     <Navigation />
                     <main className={classes.content}>
                        <Page />
                        <Footer />
                     </main>
                  </div>
               </Provider>
            </AuthProvider>
         </Router>
      </SnackbarProvider>
   );
};

export default App;
