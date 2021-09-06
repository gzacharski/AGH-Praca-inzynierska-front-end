import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import {
   updateTask,
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

   return (
      <PageWrapper>
         {task ? (
            <>
               <PageTitle>Edytuj zadanie</PageTitle>
               <TaskForm
                  taskId={taskId}
                  selectedEmployee={employee}
                  initStartDate={parseISO(dueDate)}
                  priority={TASK_STATUS[priority] || TASK_STATUS.LOW}
                  title={title}
                  description={description}
                  reduxCallback={updateTask}
                  buttonName="Modyfikuj zadanie"
               />
            </>
         ) : (
            <PageTitle>Nie znaleziono zadania</PageTitle>
         )}
      </PageWrapper>
   );
};

export default withRouter(EditTaskPage);
