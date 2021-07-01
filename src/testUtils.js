import React from 'react';
import { render as RTLrender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from 'src/main/store/store';

const render = (
   ui,
   {
      preloadedState,
      store = configureStore({ reducer, preloadedState }),
      ...renderOptions
   } = {},
) => {
   const Wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
   );
   return RTLrender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
