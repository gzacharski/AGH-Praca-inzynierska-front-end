import React from 'react';
import axios from 'axios';
import { render, screen } from 'src/testUtils';
import { waitFor } from '@testing-library/react';
import { trainingsServiceURL } from 'src/main/data/urls';
import ShowTrainings from './ShowTrainings';

jest.mock('axios');

const trainingsTestContent = [
   {
      id: '1',
      name: 'Turpis nulla',
      image: {
         data: 'https://source.unsplash.com/random',
         format: 'image/jpeg',
      },
      description: `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
          porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
          nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
          quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
          euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
          sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer1',
         name: 'Jan',
         surname: 'Kowalski',
         avatar: {
            data: '/static/images/avatar/1.jpg',
            format: 'image/jpeg',
         },
      },
   },
   {
      id: '2',
      name: 'Praesent pharetra',
      image: {
         data: 'https://source.unsplash.com/random',
         format: 'image/jpeg',
      },
      description: `Praesent pharetra tincidunt elit at ullamcorper. Nunc elementum, enim venenatis
          porta pharetra, turpis nulla congue orci, non pretium enim diam id augue. Curabitur
          nec dolor nibh. Suspendisse volutpat at augue quis vulputate. Nam lobortis et dolor 
          quis iaculis. Duis auctor bibendum rutrum. Aenean in dignissim ex. Praesent ultricies 
          euismod dolor sed accumsan. Sed nec feugiat dolor, eget elementum ipsum. Nunc in 
          sollicitudin leo. Nullam sit amet mattis mauris.`,
      date: '2020-12-12',
      duration: '1h',
      trainer: {
         id: 'trainer2',
         name: 'Jan',
         surname: 'Kowalski',
         avatar: {
            data: '/static/images/avatar/1.jpg',
            format: 'image/jpeg',
         },
      },
   },
];

describe('ShowTrainings', () => {
   const trainingsUrl = `${trainingsServiceURL}/group`;

   test('should render error message when no internet connection', async () => {
      axios.get.mockRejectedValueOnce(new Error('net::ERR_CONNECTION_REFUSED'));
      render(<ShowTrainings />);
      await waitFor(() => {
         expect(
            screen.getByText(
               'Wystąpił problem z połączeniem z serwisem. Spróbuj ponownie później lub wypróbuj inne połączenie sieciowe.',
            ),
         ).toBeInTheDocument();
      });
   });

   test('should render message when returned training list is empty', async () => {
      const data = {
         status: 404,
         data: {
            message: 'Brak ofert do wyświetlenia.',
         },
         headers: {
            'Content-Type': 'application/json; charset=UTF-8',
         },
      };
      axios.get.mockRejectedValueOnce({ response: data });
      render(<ShowTrainings />);
      await waitFor(() => {
         expect(
            screen.getByText('Brak ofert do wyświetlenia.'),
         ).toBeInTheDocument();
      });
   });

   test('should render trainings cards when response contains trainings data', async () => {
      const data = {
         status: 200,
         data: trainingsTestContent,
         headers: {
            'Content-Type': 'application/json; charset=UTF-8',
         },
      };
      axios.get.mockResolvedValueOnce(data);
      render(<ShowTrainings />);
      await waitFor(() => {
         expect(screen.getAllByTestId('trainingCard').length).toBe(
            trainingsTestContent.length,
         );
      });
   });

   test('should render circular progress when loading content', () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({}));
      render(<ShowTrainings />);
      expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
   });

   test('when loaded it should send get request to training service', async () => {
      axios.get.mockImplementationOnce(() =>
         Promise.resolve({
            status: 200,
            data: trainingsTestContent,
         }),
      );
      render(<ShowTrainings />);
      Promise.all([
         waitFor(() => expect(axios.get).toBeCalled()),
         waitFor(() =>
            expect(axios.get).toHaveBeenCalledWith(trainingsUrl, {
               headers: {
                  'Accept-Language': 'pl',
               },
            }),
         ),
      ]);
   });
});
