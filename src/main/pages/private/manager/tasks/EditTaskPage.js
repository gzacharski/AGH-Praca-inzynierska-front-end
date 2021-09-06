import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import {
   createNewTask,
   selectById,
} from 'src/main/store/sliceFiles/managerSlices/taskSlice';
import { TaskForm } from 'src/main/components/forms';
import { TASK_STATUS } from 'src/main/data/taskStatus';

const EditTaskPage = ({ match }) => {
   const { taskId = '' } = match.params;
   const task = useSelector((state) => selectById(state, taskId));

   const {
      title = '',
      description = '',
      priority = '',
      dueDate = '',
      employee = {},
   } = task || {};

   console.log(task);

   return (
      <PageWrapper>
         <PageTitle>Edytuj zadanie</PageTitle>
         {task ? (
            <TaskForm
               taskId=""
               selectedEmployee={employee}
               initStartDate={dueDate}
               priority={TASK_STATUS[priority] || TASK_STATUS.LOW}
               title={title}
               description={description}
               reduxCallback={createNewTask}
               buttonName="Modyfikuj zadanie"
            />
         ) : (
            <CircularProgress />
         )}
      </PageWrapper>
   );
};

export default withRouter(EditTaskPage);
