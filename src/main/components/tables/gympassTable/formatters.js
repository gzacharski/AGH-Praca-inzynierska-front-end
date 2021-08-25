/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
   Typography,
   makeStyles,
   Tooltip,
   Chip,
   IconButton,
} from '@material-ui/core';
import {
   Star as StarIcon,
   StarBorder as StarBorderIcon,
   Edit as EditIcon,
   Delete as DeleteIcon,
} from '@material-ui/icons';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
// import { useAuth } from 'src/main/auth';

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

const SubheaderFormatter = ({ value }) =>
   value ? <>{value}</> : <Typography>-</Typography>;

export const SubheaderStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={SubheaderFormatter} {...props} />
);

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

const StatusFormatter = ({ value }) => {
   if (value === 'active') {
      return (
         <Chip
            label="Aktywny"
            size="small"
            style={{ backgroundColor: 'limegreen' }}
         />
      );
   }
   if (value === 'archive') return <Chip label="Archiwalny" size="small" />;

   return (
      <Chip
         label="Nieaktywny"
         size="small"
         style={{ backgroundColor: 'mediumTurquoise' }}
      />
   );
};

export const StatusStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={StatusFormatter} {...props} />
);

const ActionFormatter = ({ row }) => {
   const { documentId = '' } = row;
   return (
      <div>
         <IconButton
            onClick={() => console.log(`Editing gympass id ${documentId}`)}
         >
            <EditIcon />
         </IconButton>
         <IconButton
            onClick={() => console.log(`Removing gympass id ${documentId}`)}
         >
            <DeleteIcon />
         </IconButton>
      </div>
   );
};

export const ActionStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={ActionFormatter} {...props} />
);
