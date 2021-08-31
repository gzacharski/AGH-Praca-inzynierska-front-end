/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { trainingsServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { STATUS } from '../status';
import { NOTISTACK } from '../notistack';

const workoutListAdapter = createEntityAdapter({
   selectId: (entity) => entity.trainingTypeId,
});

const initialState = workoutListAdapter.getInitialState({
   status: STATUS.IDLE,
   notistack: NOTISTACK.SUCCESS,
   message: null,
   error: null,
});

const getNotistackVariant = (error) => {
   const { status = 500 } = error?.response?.data;
   let notistack = NOTISTACK.ERROR;
   if (status === 403) notistack = NOTISTACK.WARNING;
   if (status === 404) notistack = NOTISTACK.INFO;
   return notistack;
};

export const fetchWorkoutList = createAsyncThunk(
   'workoutList/fetchWorkoutList',
   async ({ search = '' }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/trainingType${search}`;

      const config = {
         headers: {
            'Accept-Language': 'pl',
            'Content-Type': 'application/json',
         },
      };

      try {
         const response = await axios.get(url, config);
         return response.data;
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               notistack: NOTISTACK.ERROR,
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const createTrainingType = createAsyncThunk(
   'workoutList/createTrainingType',
   async (
      { file = '', name = '', description = '', duration = '', token = '' },
      { rejectWithValue },
   ) => {
      const url = `${trainingsServiceURL}/trainingType`;

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
            'Content-type': 'multipart/form-data',
         },
      };

      const body = {
         name,
         description,
         duration,
      };
      const formData = new FormData();
      try {
         if (file) {
            const blob = await fetch(file).then((r) => r.blob());
            formData.append(
               'image',
               new File([blob], 'trainingType', {
                  lastModified: new Date().getTime(),
                  type: 'image/jpeg',
               }),
            );
         }
         formData.append(
            'body',
            new Blob([JSON.stringify(body)], { type: 'application/json' }),
         );
      } catch (error) {
         return rejectWithValue({
            notistack: getNotistackVariant(500),
            message: error.message,
         });
      }

      try {
         const response = await axios.post(url, formData, config);
         const {
            message = '',
            trainingType = {
               trainingTypeId: '',
               name: '',
               description: '',
               duration: '',
               image: '',
            },
         } = response?.data;
         return { message, trainingType };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               notistack: NOTISTACK.ERROR,
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const updateTrainingType = createAsyncThunk(
   'workoutList/updateTrainingType',
   async (
      {
         file = '',
         trainingTypeId = '',
         name = '',
         description = '',
         duration = '',
         token = '',
      },
      { rejectWithValue },
   ) => {
      const url = `${trainingsServiceURL}/trainingType/${trainingTypeId}`;

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
            'Content-type': 'multipart/form-data',
         },
      };

      const body = {
         name,
         description,
         duration,
      };
      const formData = new FormData();
      try {
         if (file) {
            const blob = await fetch(file).then((r) => r.blob());
            formData.append(
               'image',
               new File([blob], 'trainingType', {
                  lastModified: new Date().getTime(),
                  type: 'image/jpeg',
               }),
            );
         }
         formData.append(
            'body',
            new Blob([JSON.stringify(body)], { type: 'application/json' }),
         );
      } catch (error) {
         return rejectWithValue({
            notistack: getNotistackVariant(500),
            message: error.message,
         });
      }

      try {
         const response = await axios.put(url, formData, config);
         const {
            message = '',
            trainingType = {
               trainingTypeId: '',
               name: '',
               description: '',
               duration: '',
               image: '',
            },
         } = response?.data;
         return { message, trainingType };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               notistack: NOTISTACK.ERROR,
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const deleteTrainingType = createAsyncThunk(
   'workoutList/deleteTrainingType',
   async ({ trainingTypeId = '', token = '' }, { rejectWithValue }) => {
      const url = `${trainingsServiceURL}/trainingType/${trainingTypeId}`;

      const config = {
         headers: {
            'Accept-Language': 'pl',
            Authorization: token,
         },
      };

      try {
         const response = await axios.delete(url, config);
         const { message = '', trainingType = {} } = response?.data;
         return { message, trainingTypeId: trainingType?.trainingTypeId || '' };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               notistack: NOTISTACK.ERROR,
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            notistack: getNotistackVariant(error),
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

const workoutListSlice = createSlice({
   name: 'workoutList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchWorkoutList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchWorkoutList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         workoutListAdapter.setAll(state, action.payload);
         state.error = null;
      },
      [fetchWorkoutList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [createTrainingType.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [createTrainingType.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         workoutListAdapter.upsertOne(state, action.payload.trainingType);
         state.error = null;
      },
      [createTrainingType.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [updateTrainingType.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [updateTrainingType.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         workoutListAdapter.upsertOne(state, action.payload.trainingType);
         state.error = null;
      },
      [updateTrainingType.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [deleteTrainingType.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [deleteTrainingType.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         workoutListAdapter.removeOne(state, action.payload.trainingTypeId);
         state.error = null;
      },
      [deleteTrainingType.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default workoutListSlice.reducer;

export const { clearMessage } = workoutListSlice.actions;

export const { selectAll: selectWorkouts, selectById } =
   workoutListAdapter.getSelectors((state) => state.workoutList);

export const selectMessage = (state) => state.workoutList.message;
export const selectStatus = (state) => state.workoutList.status;
export const selectError = (state) => state.workoutList.error;
export const selectNotistack = (state) => state.workoutList.notistack;
