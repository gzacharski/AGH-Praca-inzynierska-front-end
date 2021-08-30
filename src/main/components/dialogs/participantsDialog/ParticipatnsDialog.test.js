import React from 'react';
import { nanoid } from 'nanoid';
import { render, screen } from 'src/testUtils';
import { ParticipantList, TrainerList } from './ParticipantsDialog';

const testUsers = {
   trainers: [
      {
         userId: nanoid(),
         name: 'Toddie',
         surname: 'Makuaa',
         avatar:
            'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
      },
      {
         userId: nanoid(),
         name: 'Toddie2',
         surname: 'Makuaa2',
         avatar:
            'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg',
      },
   ],
   participants: {
      basicList: [
         {
            userId: nanoid(),
            name: 'Redford',
            surname: 'Bowdry',
            avatar:
               'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg',
         },
         {
            userId: nanoid(),
            name: 'Aditya',
            surname: 'Lindel',
            avatar:
               'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg',
         },
      ],
      reserveList: [
         {
            userId: nanoid(),
            name: 'Amery',
            surname: 'Picarello',
            avatar:
               'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg',
         },
      ],
   },
};

describe('Participants list', () => {
   describe('should render while edge cases', () => {
      test('when trainers are not specified', () => {
         render(<ParticipantList title="Test title" />);
         expect(screen.getByText('Brak osób na liście')).toBeInTheDocument();
      });

      test('when trainers are undefined', () => {
         render(<ParticipantList users={undefined} title="Test title" />);
         expect(screen.getByText('Brak osób na liście')).toBeInTheDocument();
      });

      test('when zero trainers is provided', () => {
         render(<ParticipantList users={[]} title="Test title" />);
         expect(screen.getByText('Brak osób na liście')).toBeInTheDocument();
      });
   });

   describe('should render when at least one user is provided', () => {
      beforeEach(() => {
         render(
            <ParticipantList
               users={testUsers.participants.basicList}
               title="Test title"
            />,
         );
      });

      test('should render proper title', () => {
         expect(screen.getByText('Test title')).toBeInTheDocument();
      });

      test('should render participants name and surname', () => {
         expect(screen.getByText('Redford Bowdry')).toBeInTheDocument();
         expect(screen.getByText('Aditya Lindel')).toBeInTheDocument();
      });

      test('should render participants avatar', () => {
         expect(screen.getByAltText('Redford Bowdry')).toHaveAttribute(
            'src',
            testUsers.participants.basicList[0].avatar,
         );
         expect(screen.getByAltText('Aditya Lindel')).toHaveAttribute(
            'src',
            testUsers.participants.basicList[1].avatar,
         );
      });

      test('should NOT render secondary text', () => {
         expect(screen.queryByText('Trener')).not.toBeInTheDocument();
      });
   });
});

describe('Trainer list', () => {
   describe('should render while edge cases', () => {
      test('when trainers are undefined', () => {
         render(<TrainerList />);
         expect(
            screen.getByText('Brak przypisanego trenera'),
         ).toBeInTheDocument();
      });

      test('when zero trainers is provided', () => {
         render(<TrainerList trainers={[]} />);
         expect(
            screen.getByText('Brak przypisanego trenera'),
         ).toBeInTheDocument();
      });
   });

   describe('should render when at least one trainer is provided', () => {
      beforeEach(() => {
         render(<TrainerList trainers={testUsers.trainers} />);
      });

      test('should render trainers name and surname', () => {
         expect(screen.getByText('Toddie Makuaa')).toBeInTheDocument();
         expect(screen.getByText('Toddie2 Makuaa2')).toBeInTheDocument();
      });

      test('should render participants avatar', () => {
         expect(screen.getByAltText('Toddie Makuaa')).toHaveAttribute(
            'src',
            testUsers.trainers[0].avatar,
         );
         expect(screen.getByAltText('Toddie2 Makuaa2')).toHaveAttribute(
            'src',
            testUsers.trainers[1].avatar,
         );
      });

      test('should render secondary text', () => {
         expect(screen.queryAllByText('Trener').length).toBe(2);
      });
   });
});
