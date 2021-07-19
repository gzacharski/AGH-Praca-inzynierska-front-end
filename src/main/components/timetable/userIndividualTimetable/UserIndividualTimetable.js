/* eslint-disable react/jsx-props-no-spreading */
/* eslintT-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import {
   Appointments,
   AppointmentTooltip,
   Toolbar,
   TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { makeStyles, IconButton, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { Timetable } from 'src/main/components/timetable';
import { WorkoutRequestDialog } from 'src/main/components/dialogs';
import { UserIndividualContentTooltip } from './UserIndividualContentTooltip';
import { UserIndividualHeaderTooltip } from './UserIndividualHeaderTooltip';
import { IndividualWorkoutContext } from './IndividualWorkoutContex';

const useStyles = makeStyles(({ spacing }) => ({
   flexibleSpace: {
      marginBottom: 'auto',
      marginTop: 'auto',
      marginLeft: spacing(2),
      marginRight: 'auto',
   },
   button: {
      color: 'white',
      backgroundColor: '#1e88e5',
      '&:hover': {
         backgroundColor: '#3ea8f5',
      },
   },
}));

const ToolbarButtons = ({ ...restProps }) => {
   const context = useContext(IndividualWorkoutContext);
   const { setOpenDialog } = context;
   const classes = useStyles();
   return (
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
         <Tooltip
            title="Zapytanie o trening personalny"
            arrow
            placement="right"
         >
            <IconButton
               size="small"
               onClick={() => setOpenDialog((prevstate) => !prevstate)}
               className={classes.button}
            >
               <AddIcon />
            </IconButton>
         </Tooltip>
      </Toolbar.FlexibleSpace>
   );
};

export const UserIndividualTimetable = ({
   data,
   status,
   fetchData,
   fetchedDates,
}) => (
   <>
      <Timetable
         data={data}
         status={status}
         fetchData={fetchData}
         fetchedDates={fetchedDates}
      >
         <Toolbar flexibleSpaceComponent={ToolbarButtons} />
         <TodayButton messages={{ today: 'Dzisiaj' }} />
         <Appointments />
         <AppointmentTooltip
            showCloseButton
            headerComponent={UserIndividualHeaderTooltip}
            contentComponent={UserIndividualContentTooltip}
         />
      </Timetable>
      <WorkoutRequestDialog />
   </>
);
