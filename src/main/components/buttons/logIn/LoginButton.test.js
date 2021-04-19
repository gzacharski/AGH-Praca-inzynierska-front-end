import React from 'react';
import { render, screen, act } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import App from 'src/main/App';


describe('LoginButton', () => {
   test('should render.', () => {
      render(<App />);
      expect(screen.getByTestId('login-btn')).toBeInTheDocument();
   });

   test('should have label "Zaloguj się"', () => {
      render(<App />);
      expect(screen.getByText('Zaloguj się')).toBeInTheDocument();
   });
});

describe('LoginButton clicked should route to Login page and', () => {

   test('should have "Email"', () => {
      const {unmount}=render(<App />);
      act(() => {
         const button = screen.getByTestId('login-btn');
         userEvent.click(button);
      });
      expect(screen.getByText('Email')).toBeInTheDocument();
      unmount();
   });
   
   test('should have "Hasło"', () => {
      render(<App />);
      expect(screen.getByText('Hasło')).toBeInTheDocument();
   });


   test('should have "Zapamiętaj mnie"', () => {
      render(<App />);
      expect(screen.getByText('Zapamiętaj mnie')).toBeInTheDocument();
   });
});

