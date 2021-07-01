import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
   Button,
   Fade,
   Popper,
   ClickAwayListener,
   Tooltip,
} from '@material-ui/core';
import { ArrowDropDown, Close } from '@material-ui/icons';
import { LogoutList } from 'src/main/components/menuList';
import { useStyles } from './DropDownButton.styles';

const DropDownButton = () => {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = useState(null);
   const [open, setOpen] = useState(false);

   const handleClick = (event) => {
      setOpen((prev) => !prev);
      setAnchorEl(event.currentTarget);
   };

   const handleClickAway = () => {
      setOpen(false);
      setAnchorEl(null);
   };

   return (
      <ClickAwayListener onClickAway={handleClickAway}>
         <div>
            <Tooltip
               arrow
               placement="bottom-end"
               title={open ? 'Schowaj' : 'Pokaż więcej'}
            >
               <Button
                  onClick={handleClick}
                  className={classes.button}
                  variant="text"
                  data-testid="dropDown-button"
               >
                  {open ? <Close /> : <ArrowDropDown />}
               </Button>
            </Tooltip>
            <Popper
               open={open}
               anchorEl={anchorEl}
               transition
               placement="bottom-end"
               className={classes.popper}
               data-testId="popper"
               modifiers={{
                  offset: {
                     enabled: true,
                     offset: '0, 25',
                  },
               }}
            >
               {({ TransitionProps }) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Fade {...TransitionProps}>
                     <LogoutList />
                  </Fade>
               )}
            </Popper>
         </div>
      </ClickAwayListener>
   );
};

export default withRouter(DropDownButton);
