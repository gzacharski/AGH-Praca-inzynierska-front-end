import React, { useContext } from 'react';
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectStatus,
   fetchTrainerTrainings,
} from 'src/main/store/sliceFiles/trainerSlices/trainerTimetableSlice';
import { getStartOfWeek, getEndOfWeek } from 'src/main/utils';
import { useAuth } from 'src/main/auth';
import { RefreshIconButton } from 'src/main/components/buttons';
import { useStyles } from './ToolBarButtons.styles';
import { CurrentDateContext } from '../CurrentDateContext';

const ToolbarButtons = ({ ...restProps }) => {
   const classes = useStyles();
   const status = useSelector(selectStatus);
   const dispatch = useDispatch();
   const currentDateCtx = useContext(CurrentDateContext);
   const { authState } = useAuth();
   const handleClick = () => {
      const { currentDate } = currentDateCtx;
      const startOfWeek = getStartOfWeek(currentDate);
      const endOfWeek = getEndOfWeek(currentDate);
      const { token = '', userInfo = {} } = authState;
      const { userId = '' } = userInfo;
      dispatch(
         fetchTrainerTrainings({
            startOfWeek,
            endOfWeek,
            token,
            userId,
         }),
      );
   };

   return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
         <div className={classes.buttonWrapped}>
            <RefreshIconButton status={status} onClick={handleClick} />
         </div>
      </Toolbar.FlexibleSpace>
   );
};

export { ToolbarButtons };
