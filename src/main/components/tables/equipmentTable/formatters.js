/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Chip, Avatar, Tooltip, makeStyles } from '@material-ui/core';
import { DataTypeProvider } from '@devexpress/dx-react-grid';

const useStyles = makeStyles({
   root: {
      fontWeight: 'bold',
      padding: '30px',
   },
});

const ImageFormatter = ({ row }) => {
   const classes = useStyles();
   const { image = '', title = '' } = row;
   return (
      <Tooltip title={title} arrow placement="right">
         <Avatar
            variant="rounded"
            alt={title}
            src={image}
            className={classes.avatar}
         />
      </Tooltip>
   );
};

export const ImageStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={ImageFormatter} {...props} />
);

const ImagesFormatter = ({ row }) => {
   const classes = useStyles();
   const { images = [], title = '' } = row;
   return (
      <Tooltip title={title} arrow placement="right">
         <Avatar
            variant="rounded"
            alt={title}
            src={images?.[0] || ''}
            className={classes.avatar}
         />
      </Tooltip>
   );
};

export const ImagesStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={ImagesFormatter} {...props} />
);

const EquipmentStateFormatter = ({ value }) => (
   <Chip label={value} size="small" />
);

export const EquipmentStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={EquipmentStateFormatter} {...props} />
);

const TrainingsFormatter = ({ value }) => {
   const trainings = value.map((training) => (
      <Chip key={training} label={training} size="small" />
   ));
   return <div>{trainings}</div>;
};

export const TrainingsStateDataTypeProvider = (props) => (
   <DataTypeProvider formatterComponent={TrainingsFormatter} {...props} />
);
