import React, { useContext } from 'react';
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectStatus,
   fetchUserEquipmentReservation,
} from 'src/main/store/sliceFiles/timetable/userEquipmentReservationSlice';
import { getStartOfWeek, getEndOfWeek } from 'src/main/utils';
import { useAuth } from 'src/main/auth';
import {
   RefreshIconButton,
   AddEquipmentReservationButton,
} from 'src/main/components/buttons';
import { useStyles } from './ToolbarButtons.styles';
import { CurrentDateContext } from '../CurrentDateContext';
import { UserEquipmentContext } from './UserEquipmentContext';

const ToolbarButtons = ({ ...restProps }) => {
   const classes = useStyles();
   const status = useSelector(selectStatus);
   const dispatch = useDispatch();
   const currentDateCtx = useContext(CurrentDateContext);
   const { authState = {} } = useAuth();
   const { setOpenDialog } = useContext(UserEquipmentContext);

   const handleRefreshClick = () => {
      const { currentDate } = currentDateCtx;
      const startOfWeek = getStartOfWeek(currentDate);
      const endOfWeek = getEndOfWeek(currentDate);

      const { token, userInfo = {} } = authState;
      const { userId } = userInfo;
      dispatch(
         fetchUserEquipmentReservation({
            userId,
            startOfWeek,
            endOfWeek,
            token,
         }),
      );
   };

   const handleAddClick = () => setOpenDialog((prevState) => !prevState);

   return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
         <div className={classes.buttonWrapped}>
            <RefreshIconButton status={status} onClick={handleRefreshClick} />
         </div>
         <div className={classes.buttonWrapped}>
            <AddEquipmentReservationButton onClick={handleAddClick} />
         </div>
      </Toolbar.FlexibleSpace>
   );
};

export { ToolbarButtons };
