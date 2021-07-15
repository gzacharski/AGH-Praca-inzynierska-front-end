/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { useSnackbar } from 'notistack';
import { IconButton, Menu, MenuItem, Fade } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export const HeaderTooltip = ({ appointmentData, ...restProps }) => {
   const { enqueueSnackbar } = useSnackbar();
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = (event) => {
      console.log(event);
      console.log(event.currentTarget);
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => setAnchorEl(null);

   return (
      <AppointmentTooltip.Header
         {...restProps}
         appointmentData={appointmentData}
      >
         <IconButton
            aria-haspopup="true"
            onClick={(event) => {
               enqueueSnackbar(JSON.stringify(appointmentData), {
                  variant: 'success',
                  anchorOrigin: {
                     vertical: 'bottom',
                     horizontal: 'right',
                  },
               });
               handleClick(event);
            }}
         >
            <MoreVert />
         </IconButton>
         <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
         >
            <MenuItem onClick={() => console.log('Dołącz')}>Dołącz</MenuItem>
            <MenuItem
               onClick={() => {
                  console.log('Oceń');
                  console.log(appointmentData);
               }}
            >
               Oceń
            </MenuItem>
         </Menu>
      </AppointmentTooltip.Header>
   );
};
