import React from 'react';
import { PageWrapper, PageTitle } from 'src/main/components/utils';
import { createNewTask } from 'src/main/store/sliceFiles/managerSlices/taskSlice';
import { TaskForm } from 'src/main/components/forms';

const AddTaskPage = () => (
   <PageWrapper>
      <PageTitle>Przydziel nowe zadanie</PageTitle>
      <TaskForm reduxCallback={createNewTask} buttonName="Stwórz zadanie" />
   </PageWrapper>
);

export default AddTaskPage;
