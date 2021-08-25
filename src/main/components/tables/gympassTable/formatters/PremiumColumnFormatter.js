/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Tooltip } from '@material-ui/core';
import {
   Star as StarIcon,
   StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const PremiumFormatter = ({ value }) => (
   <Tooltip
      title={value ? 'Oferta premium' : 'Oferta zwykła'}
      arrow
      placement="right"
   >
      {value ? (
         <StarIcon style={{ color: 'gold' }} />
      ) : (
         <StarBorderIcon color="disabled" />
      )}
   </Tooltip>
);

export const PremiumStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={PremiumFormatter} {...props} />
);
