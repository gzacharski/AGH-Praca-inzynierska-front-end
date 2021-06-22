import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
   Button,
   Fade,
   Popper,
   MenuList,
   MenuItem,
   Divider,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { LogoutButton } from 'src/main/components/buttons';
import { useStyles } from './DropDownButton.styles';

const DropDownButton = () => {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
   };
   return (
      <>
         <Button
            onClick={handleClick}
            className={classes.button}
            variant="text"
            data-testId="dropDown-button"
         >
            <ArrowDropDown />
         </Button>
         <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            transition
            placement="bottom-end"
            className={classes.popper}
            data-testId="popper"
            modifiers={{
               offset: {
                  enabled: true,
                  offset: '0, 15',
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
      </>
   );
};

export default withRouter(DropDownButton);
