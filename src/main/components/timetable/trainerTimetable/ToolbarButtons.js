import React, { useContext } from 'react';
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectStatus,
   fetchPrivateTimetableData,
   fetchPublicTimetableData,
} from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { getStartOfWeek, getEndOfWeek } from 'src/main/utils';
import { useAuth } from 'src/main/auth';
import {
   RefreshIconButton,
   AddWorkoutButton,
} from 'src/main/components/buttons';
import { DialogContext } from 'src/main/components/contexts/DialogContext';
import { useStyles } from './ToolBarButtons.styles';
import { CurrentDateContext } from '../CurrentDateContext';

const ToolbarButtons = ({ ...restProps }) => {
   const classes = useStyles();
   const status = useSelector(selectStatus);
   const dispatch = useDispatch();
   const currentDateCtx = useContext(CurrentDateContext);
   const { authState, isAuthenticated } = useAuth();
   const { openAddDialog } = useContext(DialogContext);

   const handleClick = () => {
      const { currentDate } = currentDateCtx;
      const startOfWeek = getStartOfWeek(currentDate);
      const endOfWeek = getEndOfWeek(currentDate);

      if (isAuthenticated()) {
         const { token } = authState;
         dispatch(
            fetchPrivateTimetableData({
               startOfWeek,
               endOfWeek,
               token,
            }),
         );
      } else {
         dispatch(
            fetchPublicTimetableData({
               startOfWeek,
               endOfWeek,
            }),
         );
      }
   };

   return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
         <div className={classes.buttonWrapped}>
            <RefreshIconButton status={status} onClick={handleClick} />
         </div>
         <div className={classes.buttonWrapped}>
            <AddWorkoutButton callback={openAddDialog} />
         </div>
      </Toolbar.FlexibleSpace>
   );
};

export { ToolbarButtons };
