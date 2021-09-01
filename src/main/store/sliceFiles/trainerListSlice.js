/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { accountServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../status';
import { NOTISTACK } from '../notistack';

const trainerListAdapter = createEntityAdapter({
   selectId: (entity) => entity.userId,
});

const initialState = trainerListAdapter.getInitialState({
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

export const fetchTrainerList = createAsyncThunk(
   'trainerList/fetchTrainerList',
   async ({ search = '' }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/trainer${search}`;

      try {
         const response = await axios.get(url, config());
         return response.data;
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               error: error?.response?.data,
               message: NETWORK_ERROR,
            });
         }
         return rejectWithValue({
            error: error?.response?.data,
            message: error?.response?.data?.message,
         });
      }
   },
);

export const fetchTrainerProfile = createAsyncThunk(
   'trainerList/fetchTrainerProfile',
   async ({ userId = '', token = '' }, { rejectWithValue }) => {
      const url = `${accountServiceURL}/trainer/${userId}`;

      try {
         const response = await axios.get(url, config(token));
         return response?.data;
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

export const createTrainerProfile = createAsyncThunk(
   'trainerList/createTrainerProfile',
   async (
      {
         file = '',
         userId = '',
         synopsis = '',
         full = '',
         trainingIds = [],
         token = '',
      },
      { rejectWithValue },
   ) => {
      const url = `${accountServiceURL}/trainer/${userId}`;

      const body = {
         userId,
         synopsis,
         full,
         trainingIds,
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
         const response = await axios.post(url, formData, {
            headers: {
               'Accept-Language': 'pl',
               Authorization: token,
               'Content-type': 'multipart/form-data',
            },
         });
         const { message = '', trainer = {} } = response?.data;
         return { message, trainer };
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

export const updateTrainerProfile = createAsyncThunk(
   'trainerList/updateTrainerProfile',
   async (
      {
         file = '',
         userId = '',
         synopsis = '',
         full = '',
         trainingIds = [],
         token = '',
      },
      { rejectWithValue },
   ) => {
      const url = `${accountServiceURL}/trainer/${userId}`;

      const body = {
         userId,
         synopsis,
         full,
         trainingIds,
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
         const response = await axios.put(url, formData, {
            headers: {
               'Accept-Language': 'pl',
               Authorization: token,
               'Content-type': 'multipart/form-data',
            },
         });
         const { message = '', trainer = {} } = response?.data;
         return { message, trainer };
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

const trainerListSlice = createSlice({
   name: 'trainerList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchTrainerList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchTrainerList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.error = null;
         state.message = null;
         trainerListAdapter.upsertMany(state, action.payload);
      },
      [fetchTrainerList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [fetchTrainerProfile.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchTrainerProfile.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = null;
         state.error = null;
         trainerListAdapter.upsertOne(state, action.payload);
      },
      [fetchTrainerProfile.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = NOTISTACK.SUCCESS;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [createTrainerProfile.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [createTrainerProfile.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         state.error = null;
         trainerListAdapter.upsertOne(state, action.payload.trainer);
      },
      [createTrainerProfile.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = NOTISTACK.SUCCESS;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [updateTrainerProfile.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [updateTrainerProfile.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         state.error = null;
         trainerListAdapter.upsertOne(state, action.payload.trainer);
      },
      [updateTrainerProfile.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = NOTISTACK.SUCCESS;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default trainerListSlice.reducer;

export const { clearMessage } = trainerListSlice.actions;

export const { selectAll: selectTrainers, selectById } =
   trainerListAdapter.getSelectors((state) => state.trainerList);

export const selectMessage = (state) => state.trainerList.message;
export const selectStatus = (state) => state.trainerList.status;
export const selectError = (state) => state.trainerList.error;
