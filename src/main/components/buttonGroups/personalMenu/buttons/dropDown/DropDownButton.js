import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
   Button,
   Fade,
   Popper,
   MenuList,
   MenuItem,
   Divider,
   ClickAwayListener,
   Tooltip,
} from '@material-ui/core';
import { ArrowDropDown, Close } from '@material-ui/icons';
import { LogoutButton } from 'src/main/components/buttons';
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
                  <Fade {...TransitionProps} timeout={350}>
                     <div className={classes.paper}>
                        <MenuList>
                           <MenuItem>Moje konto</MenuItem>
                           <Divider />
                           <MenuItem>Pomoc</MenuItem>
                           <MenuItem>Ustawienia prywatności</MenuItem>
                           <MenuItem>Ustawienia wyświetlania</MenuItem>
                           <Divider />
                           <LogoutButton />
                        </MenuList>
                     </div>
                  </Fade>
               )}
            </Popper>
         </div>
      </ClickAwayListener>
   );
};

export default withRouter(DropDownButton);
