/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton, Menu, MenuItem, Fade } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export const HeaderTooltip = ({ appointmentData, ...restProps }) => {
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = (event) => setAnchorEl(event.currentTarget);

   const handleClose = () => setAnchorEl(null);

   return (
      <AppointmentTooltip.Header
         {...restProps}
         appointmentData={appointmentData}
      >
         <IconButton
            aria-haspopup="true"
            onClick={(event) => handleClick(event)}
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
            <MenuItem>Dołącz</MenuItem>
            <MenuItem>Oceń</MenuItem>
         </Menu>
      </AppointmentTooltip.Header>
   );
};
