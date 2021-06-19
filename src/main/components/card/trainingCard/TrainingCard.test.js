import React from 'react';
import { render, screen } from 'src/testUtils';
import userEvent from '@testing-library/user-event';
import { act, waitFor } from '@testing-library/react';
import TrainingCard from './TrainingCard';

describe('Training card', () => {
   beforeEach(() => {
      render(
         <TrainingCard
            imageSource="test image source"
            title="test training title"
            description="test training description"
            trainer="Test trainer"
            trainerAvatar="Trainer avatar"
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
