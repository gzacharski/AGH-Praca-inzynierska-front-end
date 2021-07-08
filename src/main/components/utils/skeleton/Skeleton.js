import React from 'react';
import { Skeleton as MuiSkeleton } from '@material-ui/lab';

export const Skeleton = ({ render, ...props }) => {
   const { children } = props;
   const properties = { ...props };
   delete properties.children;

   if (!render)
      return (
         // eslint-disable-next-line react/jsx-props-no-spreading
         <MuiSkeleton {...properties} data-testid="skeleton">
            {children}
         </MuiSkeleton>
      );
   return <>{children}</>;
};
