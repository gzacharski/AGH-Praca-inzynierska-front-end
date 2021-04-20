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
   const filteredUrls = ['/login', '/sign-up'];

   return (
      <div className={classes.root} data-testid="app-container">
         <AuthProvider>
            <Provider store={appStore}>
               <CssBaseline />
               <Router basename={process.env.PUBLIC_URL}>
                  <FilterRenderer urls={filteredUrls}>
                     <Header />
                  </FilterRenderer>
                  <Navigation />
                  <Page />
                  <FilterRenderer urls={filteredUrls}>
                     <Footer />
                  </FilterRenderer>
               </Router>
            </Provider>
         </AuthProvider>
      </div>
   );
}
