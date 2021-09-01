import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   Dialog,
   Typography,
   Grid,
   Paper,
   makeStyles,
   Button,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Checkbox,
   Divider,
} from '@material-ui/core';
import {
   DialogContext,
   DIALOG_MODE,
} from 'src/main/components/contexts/DialogContext';
import { useAuth } from 'src/main/auth';

const useStyles = makeStyles(({ spacing }) => ({
   column: {
      padding: spacing(2),
   },
   dialog: {
      margin: spacing(2),
   },
}));

const ROLES = {
   USER: 'user',
   TRAINER: 'trainer',
   EMPLOYEE: 'employee',
   MANAGER: 'manager',
   ADMIN: 'admin',
};

const ROLES_PL = {
   USER: 'Użytkownik',
   TRAINER: 'Trener',
   EMPLOYEE: 'Pracownik',
   MANAGER: 'Menadżer',
   ADMIN: 'Administrator',
};

const Form = ({
   accessibleRoles = [],
   roles = [],
   onClose = () => false,
   userId = '',
   changeClientRoles,
}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const { authState = {} } = useAuth();
   const [left, setLeft] = useState(
      accessibleRoles.map((role) => ({ checked: false, name: role })),
   );
   const [right, setRight] = useState(
      roles.map((role) => ({ checked: false, name: role })),
   );

   const moveCheckedFromLeftToRight = () => {
      const temp = left.filter((role) => role.checked === true);
      setRight((rightState) =>
         [...rightState, ...temp].map((theRole) => ({
            ...theRole,
            checked: false,
         })),
      );
      setLeft((leftState) =>
         leftState.filter((role) => role.checked === false),
      );
   };

   const moveCheckedFromRightToLeft = () => {
      const temp = right.filter((role) => role.checked === true);
      setLeft((leftState) =>
         [...leftState, ...temp].map((theRole) => ({
            ...theRole,
            checked: false,
         })),
      );
      setRight((rightState) =>
         rightState.filter((role) => role.checked === false),
      );
   };

   const handleRightCheck = (role) => {
      const rightChecked = right.map((theRole) => {
         if (theRole === role) {
            return { ...theRole, checked: !theRole.checked };
         }
         return theRole;
      });
      setRight(rightChecked);
   };

   const handleLeftCheck = (role) => {
      const leftChecked = left.map((theRole) => {
         if (theRole === role) {
            return { ...theRole, checked: !theRole.checked };
         }
         return theRole;
      });
      setLeft(leftChecked);
   };

   const handleSubmit = () => {
      const { token = '' } = authState;
      dispatch(
         changeClientRoles({
            userId,
            roles: right.map((role) => role.name),
            token,
         }),
      );
      onClose();
   };

   return (
      <div className={classes.dialog}>
         <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
         >
            <Grid item>
               <Paper elevation={2}>
                  <Typography className={classes.column}>
                     Dostępne role
                  </Typography>
                  <Divider />
                  <List>
                     {left.map((role) => {
                        const { name = '', checked = false } = role || {};
                        const isDisabled = [ROLES.USER, ROLES.ADMIN].includes(
                           name.toLowerCase(),
                        );
                        return (
                           <ListItem key={name} disabled={isDisabled}>
                              <ListItemIcon>
                                 <Checkbox
                                    checked={checked}
                                    onClick={() => handleLeftCheck(role)}
                                    disabled={isDisabled}
                                 />
                              </ListItemIcon>
                              <ListItemText>{ROLES_PL[name]}</ListItemText>
                           </ListItem>
                        );
                     })}
                  </List>
               </Paper>
            </Grid>
            <Grid item>
               <Grid container direction="column" alignItems="center">
                  <Button
                     variant="outlined"
                     size="small"
                     className={classes.button}
                     onClick={moveCheckedFromLeftToRight}
                     aria-label="move selected right"
                  >
                     &gt;
                  </Button>
                  <Button
                     variant="outlined"
                     size="small"
                     className={classes.button}
                     onClick={moveCheckedFromRightToLeft}
                     aria-label="move selected left"
                  >
                     &lt;
                  </Button>
               </Grid>
            </Grid>
            <Grid item>
               <Paper elevation={2}>
                  <Typography className={classes.column}>
                     Przypisane role
                  </Typography>
                  <Divider />
                  <List>
                     {right.map((role) => {
                        const { name = '', checked = false } = role || {};
                        const isDisabled = [ROLES.USER, ROLES.ADMIN].includes(
                           name.toLowerCase(),
                        );
                        return (
                           <ListItem key={name} disabled={isDisabled}>
                              <ListItemIcon>
                                 <Checkbox
                                    checked={checked}
                                    onClick={() => handleRightCheck(role)}
                                    disabled={isDisabled}
                                 />
                              </ListItemIcon>
                              <ListItemText>{ROLES_PL[name]}</ListItemText>
                           </ListItem>
                        );
                     })}
                  </List>
               </Paper>
            </Grid>
         </Grid>
         <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
         >
            <Grid item>
               <Button variant="outlined" onClick={handleSubmit}>
                  Zapisz zmiany
               </Button>
            </Grid>
         </Grid>
      </div>
   );
};

export const UserRolesDialog = ({ selectById, changeClientRoles }) => {
   const { dialogState, closeDialog, entityId } = useContext(DialogContext);
   const { INFO } = DIALOG_MODE;
   const { mode = INFO, isOpen = false } = dialogState;

   const selectedRow = useSelector((state) => selectById(state, entityId));

   const shouldOpen = mode === DIALOG_MODE.ROLES && isOpen;

   const { roles = [] } = selectedRow || {};

   const accessibleRoles = Object.keys(ROLES).filter(
      (role) => !roles.includes(role),
   );

   return (
      <Dialog open={shouldOpen} onClose={closeDialog} maxWidth="md">
         {roles.length !== 0 && (
            <Form
               userId={entityId}
               accessibleRoles={accessibleRoles}
               roles={roles}
               onClose={closeDialog}
               changeClientRoles={changeClientRoles}
            />
         )}
      </Dialog>
   );
};
