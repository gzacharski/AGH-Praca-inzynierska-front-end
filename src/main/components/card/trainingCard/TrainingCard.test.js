import React from 'react';
import { nanoid } from 'nanoid';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import { act, waitFor } from '@testing-library/react';
import TrainingCard from './TrainingCard';

describe('Training card', () => {
   beforeEach(() => {
      render(
         <TrainingCard
            image="https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGZpdG5lc3MlMjBlcXVpcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            title="test training title"
            description="test training description"
            trainer={{
               trainerId: nanoid(),
               name: 'TestName',
               surname: 'TestSurname',
               avatar: 'https://fwcdn.pl/ppo/71/04/57104/449672.2.jpg',
            }}
         />,
      );
   });
   test('should render training title', () => {
      expect(screen.getByText('test training title')).toBeInTheDocument();
   });

   test('should render training description', () => {
      expect(screen.getByText('test training description')).toBeInTheDocument();
   });

   test('should render background image', () => {
      expect(screen.getByTestId('background-image')).toBeInTheDocument();
   });

   test('should render trainer avatar', () => {
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
   });

   test('when card clicked, it should render backdrop', async () => {
      act(() => {
         userEvent.click(screen.getByTestId('trainingCard'));
      });

      await waitFor(() => {
         expect(screen.getByTestId('backdropcard')).toBeInTheDocument();
      });
   });

   test('when close button clicked, it should not render backdrop', async () => {
      act(() => {
         userEvent.click(screen.getByTestId('trainingCard'));
      });

      await waitFor(() => {
         expect(screen.getByTestId('backdropcard')).toBeInTheDocument();
      });

      act(() => {
         userEvent.click(screen.getByTestId('close-button'));
      });

      await waitFor(() => {
         expect(screen.queryByTestId('backdropcard')).not.toBeInTheDocument();
      });
   });
});
