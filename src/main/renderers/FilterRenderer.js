import React from 'react';
import { withRouter } from 'react-router-dom';
import { startsWithAny } from './str-checker';

const FilterRenderer = (props) => {
   const { location, urls, children } = props;

   const renderIfNotInSpecifiedURLs = () =>
      startsWithAny(location.pathname, urls) ? null : children;

   return <>{renderIfNotInSpecifiedURLs()}</>;
};

export default withRouter(FilterRenderer);
