import React from 'react';
import { render, screen } from 'src/testUtils';
import ConfirmationIcon from './ConfirmationIcon';

test('ConfirmationIcon should render', () => {
   render(<ConfirmationIcon />);
   expect(screen.getByTestId('confirmation-icon')).toBeInTheDocument();
});

describe('When OnRequest is set to true', () => {
   test('should render LockOutlined icon', () => {
      render(<ConfirmationIcon onRequest />);
      expect(screen.getByTestId('lock')).toBeInTheDocument();
   });

   test('should NOT render CheckCircle icon when status 200', () => {
      render(<ConfirmationIcon onRequest status={200} />);
      expect(screen.queryByTestId('check-circle')).not.toBeInTheDocument();
   });

   test('should NOT render ReportProblem icon when status 401', () => {
      render(<ConfirmationIcon onRequest status={401} />);
      expect(screen.queryByTestId('report-problem')).not.toBeInTheDocument();
   });

   test('should NOT render ReportProblem icon when status 404', () => {
      render(<ConfirmationIcon onRequest status={404} />);
      expect(screen.queryByTestId('report-problem')).not.toBeInTheDocument();
   });

   test('should NOT render Error  icon when status 500', () => {
      render(<ConfirmationIcon onRequest status={500} />);
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
   });
});

describe('When OnRequest is set to false', () => {
   test('should NOT render LockOutlined icon', () => {
      render(<ConfirmationIcon onRequest={false} />);
      expect(screen.getByTestId('lock')).toBeInTheDocument();
   });

   test('should render CheckCircle icon when status 200', () => {
      render(<ConfirmationIcon onRequest={false} status={200} />);
      expect(screen.getByTestId('check-circle')).toBeInTheDocument();
   });

   test('should render ReportProblem icon when status 401', () => {
      render(<ConfirmationIcon onRequest={false} status={401} />);
      expect(screen.getByTestId('report-problem')).toBeInTheDocument();
   });

   test('should render ReportProblem icon when status 404', () => {
      render(<ConfirmationIcon onRequest={false} status={404} />);
      expect(screen.getByTestId('report-problem')).toBeInTheDocument();
   });

   test('should render Error  icon when status 500', () => {
      render(<ConfirmationIcon onRequest={false} status={500} />);
      expect(screen.getByTestId('error')).toBeInTheDocument();
   });
});
