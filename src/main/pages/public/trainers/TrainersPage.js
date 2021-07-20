import React from 'react';
import { Grid } from '@material-ui/core';
import { nanoid } from 'nanoid';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';
import { TrainerCard } from 'src/main/components/card';

const testData = [
   {
      userId: nanoid(),
      name: 'Redford',
      surname: 'Bowdry',
      images: [
         'https://images.unsplash.com/photo-1549476464-37392f717541?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
         'https://images.unsplash.com/photo-1613685044678-0a9ae422cf5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80',
      ],
      avatar: 'https://fwcdn.pl/ppo/71/04/57104/449672.2.jpg',
      description: {
         synopsis: 'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
         trainings: [
            { trainingId: nanoid(), title: 'Trening personalny' },
            { trainingId: nanoid(), title: 'TRX' },
         ],
      },
   },
   {
      userId: nanoid(),
      name: 'Redford',
      surname: 'Bowdry',
      // images: [
      //    'https://images.unsplash.com/photo-1613685044678-0a9ae422cf5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80',
      //    'https://images.unsplash.com/photo-1549476464-37392f717541?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
      // ],
      avatar: 'https://fwcdn.pl/ppo/28/34/2834/449663.2.jpg',
      description: {
         // synopsis: 'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
         full: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non lorem a dolor gravida tincidunt. Duis bibendum ligula at scelerisque pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris scelerisque tortor nec aliquam ultrices. Fusce fermentum sed nulla sed venenatis. Curabitur vehicula tristique odio, in feugiat velit accumsan sed. Ut et fermentum purus, in euismod dui. Vestibulum vehicula mollis enim vitae porttitor. Nam in bibendum nunc. Curabitur suscipit faucibus dolor. Nam a felis mattis, tincidunt libero id, feugiat tellus. Praesent neque neque, aliquet at nisl ut, tristique tincidunt tellus. Phasellus rhoncus felis nec enim malesuada, et eleifend diam vehicula. Sed posuere, leo ac placerat sagittis, augue turpis rutrum sem, at efficitur quam elit ac augue. Sed rhoncus a nibh nec tincidunt.',
         trainings: [
            { trainingId: nanoid(), title: 'Trening personalny' },
            { trainingId: nanoid(), title: 'TRX' },
            { trainingId: nanoid(), title: 'Wiosła' },

            { trainingId: nanoid(), title: 'Trening personalny' },

            { trainingId: nanoid(), title: 'Pilates' },
            { trainingId: nanoid(), title: 'Trening personalny' },
            { trainingId: nanoid(), title: 'TRX' },
            { trainingId: nanoid(), title: 'Wiosła' },
            { trainingId: nanoid(), title: 'Pilates' },
         ],
      },
   },
   {
      userId: nanoid(),
      name: 'Redford',
      surname: 'Bowdry',
      images: [
         'https://images.unsplash.com/photo-1613685044678-0a9ae422cf5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80',
         'https://images.unsplash.com/photo-1549476464-37392f717541?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
      ],
      avatar: 'https://fwcdn.pl/ppo/28/34/2834/449663.2.jpg',
      description: {
         synopsis: 'Gdy potrzebujesz skorzystać jednorazowo z naszej siłowni',
         full: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non lorem a dolor gravida tincidunt. Duis bibendum ligula at scelerisque pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris scelerisque tortor nec aliquam ultrices. Fusce fermentum sed nulla sed venenatis. Curabitur vehicula tristique odio, in feugiat velit accumsan sed. Ut et fermentum purus, in euismod dui. Vestibulum vehicula mollis enim vitae porttitor. Nam in bibendum nunc. Curabitur suscipit faucibus dolor. Nam a felis mattis, tincidunt libero id, feugiat tellus. Praesent neque neque, aliquet at nisl ut, tristique tincidunt tellus. Phasellus rhoncus felis nec enim malesuada, et eleifend diam vehicula. Sed posuere, leo ac placerat sagittis, augue turpis rutrum sem, at efficitur quam elit ac augue. Sed rhoncus a nibh nec tincidunt.',
         trainings: [
            { trainingId: nanoid(), title: 'Trening personalny' },
            { trainingId: nanoid(), title: 'Wiosła' },
            { trainingId: nanoid(), title: 'Pilates' },
         ],
      },
   },
];

const TrainersPage = () => (
   <PageWrapper>
      <PublicPageTitle
         header="Nasi trenerzy"
         subheader="Dowiedz się więcej o prowadzących zajęcia fitness"
      />
      <Grid container spacing={4} justifyContent="center" alignItems="baseline">
         {testData.map((trainer) => {
            const { userId, name, surname, images, avatar, description } =
               trainer;
            return (
               <TrainerCard
                  key={userId}
                  name={name}
                  surname={surname}
                  images={images}
                  avatar={avatar}
                  description={description}
               />
            );
         })}
      </Grid>
   </PageWrapper>
);

export default TrainersPage;
