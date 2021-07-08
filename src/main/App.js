import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/main/auth';
import store from 'src/main/store/store';
import { Footer, Header, Navigation, Page } from './layout';
import { useStyles } from './App.styles';
import FilterRenderer from './renderers/FilterRenderer';

export default function App() {
   const classes = useStyles();
   const filteredUrls = [
      '/login',
      '/sign-up',
      '/confirmRegistration',
      '/confirmNewPassword',
   ];

   return (
      <div className={classes.root} data-testid="app-container">
         <SnackbarProvider maxSnack={4}>
            <Router basename={process.env.PUBLIC_URL}>
               <AuthProvider>
                  <Provider store={store}>
                     <CssBaseline />
                     <FilterRenderer urls={filteredUrls}>
                        <Header />
                     </FilterRenderer>
                     <Navigation />
                     <Page />
                     <FilterRenderer urls={filteredUrls}>
                        <Footer />
                     </FilterRenderer>
                  </Provider>
               </AuthProvider>
            </Router>
         </SnackbarProvider>
      </div>
   );
}
