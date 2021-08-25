/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const useStyles = makeStyles({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
   price: {
      display: 'flex',
   },
   bolded: {
      fontWeight: 'bold',
   },
});

const PriceFormatter = ({ value }) => {
   const classes = useStyles();
   const { amount = '', currency = '', period = '' } = value;
   return (
      <div className={classes.price}>
         <Typography className={classes.bolded}>{amount}</Typography>
         <Typography>{currency}</Typography>
         <span>/{period}</span>
      </div>
   );
};

export const PriceStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={PriceFormatter} {...props} />
);
