import React, { useContext } from 'react';
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectStatus,
   fetchUserIndividualReservation,
} from 'src/main/store/sliceFiles/timetable/userIndividualReservationSlice';
import { getStartOfWeek, getEndOfWeek } from 'src/main/utils';
import {
   RefreshIconButton,
   AddIndividualWorkoutButton,
} from 'src/main/components/buttons';
import { useAuth } from 'src/main/auth';
import { IndividualWorkoutContext } from './IndividualWorkoutContex';
import { useStyles } from './ToolbarButtons.styles';
import { CurrentDateContext } from '../CurrentDateContext';

export const ToolbarButtons = ({ ...restProps }) => {
   const classes = useStyles();

   const context = useContext(IndividualWorkoutContext);
   const currentDateCtx = useContext(CurrentDateContext);

   const status = useSelector(selectStatus);
   const dispatch = useDispatch();

   const { setOpenDialog } = context;
   const { authState = {} } = useAuth();

   const handleRefreshClick = () => {
      const { currentDate } = currentDateCtx;
      const startOfWeek = getStartOfWeek(currentDate);
      const endOfWeek = getEndOfWeek(currentDate);

      const { token, userInfo = {} } = authState;
      const { userId } = userInfo;
      dispatch(
         fetchUserIndividualReservation({
            userId,
            startOfWeek,
            endOfWeek,
            token,
         }),
      );
   };

   const handleAddIndividualWorkoutClick = () =>
      setOpenDialog((prevstate) => !prevstate);

   return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
         <div className={classes.buttonWrapped}>
            <RefreshIconButton status={status} onClick={handleRefreshClick} />
         </div>
         <div className={classes.buttonWrapped}>
            <AddIndividualWorkoutButton
               callback={handleAddIndividualWorkoutClick}
            />
         </div>
      </Toolbar.FlexibleSpace>
   );
};
