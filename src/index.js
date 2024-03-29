import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from 'src/main/auth';
import App from './main/App';
import reportWebVitals from './main/reportWebVitals';

async function main() {
   // if (process.env.NODE_ENV === 'development') {
   //    // eslint-disable-next-line global-require
   //    const { worker } = require('src/mocks/browser');
   //    await worker.start({
   //       serviceWorker: {
   //          url: '/mockServiceWorker.js',
   //       },
   //    });
   // }

   ReactDOM.render(
      <React.StrictMode>
         <AuthProvider>
            <App />
         </AuthProvider>
      </React.StrictMode>,
      document.getElementById('root'),
   );

   // If you want to start measuring performance in your app, pass a function
   // to log results (for example: reportWebVitals(console.log))
   // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
   reportWebVitals();
}

main();
