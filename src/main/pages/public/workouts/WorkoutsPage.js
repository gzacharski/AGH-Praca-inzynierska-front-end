import React from 'react';
import { ShowTrainings } from 'src/main/components/gallery';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';

const WorkoutsPage = () => (
   <PageWrapper>
      <PublicPageTitle
         header="Oferta zajęć grupowych"
         subheader="Dobierz odpowiedni trening dla siebie"
      />
      <ShowTrainings />
   </PageWrapper>
);

export default WorkoutsPage;
