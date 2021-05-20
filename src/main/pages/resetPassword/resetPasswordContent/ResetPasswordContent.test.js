import React from 'react';
import { render, screen } from 'src/testUtils';
import ResetPasswordContent from './ResetPasswordContent';

const setMessage = jest.fn();
const setOnRequest = jest.fn();
const setStatus = jest.fn();

describe('ResetPasswordContent', () => {
   describe('should render ResetPasswordForm', () => {
      beforeEach(() => {
         render(
            <ResetPasswordContent
               setMessage={setMessage}
               setOnRequest={setOnRequest}
               setStatus={setStatus}
            />,
         );
      });

      test('should contain email field', () => {
         expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
      });

      test('should contain button', () => {
         expect(screen.getByRole('button')).toBeInTheDocument();
         expect(screen.getByRole('button')).toHaveTextContent(
            'Wyślij link do zmiany hasła',
         );
      });
   });

   test('should render null', () => {
      render(
         <ResetPasswordContent
            status={200}
            setMessage={setMessage}
            setOnRequest={setOnRequest}
            setStatus={setStatus}
         />,
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
   });
});
