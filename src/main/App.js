import React from 'react';
import clsx from 'clsx';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { pl } from 'date-fns/locale';
import { store } from 'src/main/store';
import { Footer, Header, Navigation, Page } from 'src/main/layout';
import { useAuth } from 'src/main/auth';
import { useStyles } from './App.styles';

const App = () => {
   const classes = useStyles();
   const { isAuthenticated = () => false } = useAuth();
   const authenticated = isAuthenticated();
   return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl}>
         <SnackbarProvider maxSnack={4}>
            <Router>
               <Provider store={store}>
                  <div className={classes.root}>
                     <CssBaseline />
                     <Header />
                     <Navigation />
                     <main
                        className={clsx(classes.content, {
                           [classes.imageAuth]: authenticated,
                           [classes.image]: !authenticated,
                        })}
                     >
                        <Page />
                        <Footer />
                     </main>
                  </div>
               </Provider>
            </Router>
         </SnackbarProvider>
      </MuiPickersUtilsProvider>
   );
};

export default App;
