import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/main/auth';
import appStore from './store';
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
         <Router basename={process.env.PUBLIC_URL}>
            <AuthProvider>
               <Provider store={appStore}>
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
      </div>
   );
}
