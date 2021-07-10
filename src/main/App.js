import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/main/auth';
import store from 'src/main/store/store';
import { Footer, Header, Navigation, Page } from 'src/main/layout';

const App = () => (
   <SnackbarProvider maxSnack={4} preventDuplicate>
      <Router basename={process.env.PUBLIC_URL}>
         <AuthProvider>
            <Provider store={store}>
               <CssBaseline />
               <Header />
               <Navigation />
               <Page />
               <Footer />
            </Provider>
         </AuthProvider>
      </Router>
   </SnackbarProvider>
);

export default App;
