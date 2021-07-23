import React from 'react';
import userEvent from '@testing-library/user-event';
import { STATUS } from 'src/main/store';
import { render, screen, waitFor } from 'src/testUtils';
import { RefreshIconButton } from './RefreshIconButton';

const callback = jest.fn();

describe('Refresh button', () => {
   test('should render without progressbar', () => {
      render(<RefreshIconButton status={STATUS.LOADING} onClick={callback} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(callback).not.toHaveBeenCalled();
   });

   test('should render tooltip on hover', async () => {
      render(<RefreshIconButton status={STATUS.LOADING} onClick={callback} />);

      userEvent.hover(screen.getByRole('button'));

      await waitFor(() => {
         expect(screen.getByText('Odśwież')).toBeInTheDocument();
         expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
         expect(callback).not.toHaveBeenCalled();
      });
   });

   test('should render button with progressbar when clicked', () => {
      render(<RefreshIconButton status={STATUS.LOADING} onClick={callback} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(callback).toHaveBeenCalled();
   });
});
