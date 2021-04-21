import React from 'react';
import { render, screen } from 'src/testUtils';
import { LogInIcon } from './LogInIcon';

describe('LogIn icon should render', () => {
   test('lockOutlined icon before log in or when unsuccessful', () => {
       render(<LogInIcon progress={false} success={false}/>)
       expect(screen.getByTestId('log-in-lock')).toBeInTheDocument();
   });

   test('circularCirle while trying to log in',()=>{
    render(<LogInIcon progress success={false}/>)
    expect(screen.getByTestId('log-in-progress')).toBeInTheDocument();
   })

   test('checkCircle after successuful log in',()=>{
    render(<LogInIcon progress={false} success/>)
    expect(screen.getByTestId('log-in-success')).toBeInTheDocument();
   })
});
