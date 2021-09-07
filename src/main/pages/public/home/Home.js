import React from 'react';
import { PageWrapper, PublicPageTitle } from 'src/main/components/utils';

export default function Home() {
   return (
      <PageWrapper>
         <PublicPageTitle
            header="Praca inżynierska"
            subheader="System do wspomagania zarządzania placówką profilaktyki zdrowotnej"
         />
      </PageWrapper>
   );
}
