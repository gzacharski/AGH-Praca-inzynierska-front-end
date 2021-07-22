/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useContext } from 'react';
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { IconButton, Tooltip, CircularProgress } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
   selectStatus,
   fetchPrivateTimetableData,
   fetchPublicTimetableData,
} from 'src/main/store/sliceFiles/timetable/timetableSlice';
import { getStartOfWeek, getEndOfWeek } from 'src/main/utils';
import { STATUS } from 'src/main/store';
import { useAuth } from 'src/main/auth';
import { useStyles } from './ToolBarButtons.styles';
import { CurrentDateContext } from '../CurrentDateContext';

const ToolbarButtons = ({ ...restProps }) => {
   const classes = useStyles();
   const status = useSelector(selectStatus);
   // eslint-disable-next-line no-unused-vars
   const [clicked, setClicked] = useState(false);
   const dispatch = useDispatch();
   const currentDateCtx = useContext(CurrentDateContext);
   const { authState, isAuthenticated } = useAuth();

   useEffect(() => {
      if (status === STATUS.SUCCEEDED) setClicked(false);
   }, [status]);
   return (
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
         <Tooltip title="Odśwież" arrow placement="right">
            <div className={classes.wrapper}>
               <IconButton
                  size="small"
                  onClick={() => {
                     const { currentDate } = currentDateCtx;
                     setClicked(true);
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
                  }}
                  className={classes.button}
               >
                  <RefreshIcon />
               </IconButton>
               {status === STATUS.LOADING && (
                  <CircularProgress size={40} className={classes.progress} />
               )}
            </div>
         </Tooltip>
      </Toolbar.FlexibleSpace>
   );
};

export { ToolbarButtons };
