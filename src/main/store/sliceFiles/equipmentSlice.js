/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
   createSlice,
   createAsyncThunk,
   createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { equipmentServiceURL } from 'src/main/data/urls';
import { NETWORK_ERROR } from 'src/main/data/messages';
import { requestConfig as config } from 'src/main/utils';
import { STATUS } from '../status';
import { NOTISTACK } from '../notistack';

const equipmentListAdapter = createEntityAdapter({
   selectId: (entity) => entity.equipmentId,
});

const initialState = equipmentListAdapter.getInitialState({
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

export const fetchEquipmentList = createAsyncThunk(
   'equipmentList/fetchEquipmentList',
   async ({ search = '' }, { rejectWithValue }) => {
      const url = `${equipmentServiceURL}${search}`;

      try {
         const response = await axios.get(url, config());
         return response?.data || [];
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
               notistack: getNotistackVariant(error),
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

export const addEquipment = createAsyncThunk(
   'equipmentList/createTrainingType',
   async (
      { file = '', title = '', synopsis = '', trainingIds = '', token = '' },
      { rejectWithValue },
   ) => {
      const url = `${equipmentServiceURL}`;

      const body = {
         title,
         synopsis,
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
         const {
            message = '',
            equipment = {
               equipmentId: '',
               title: '',
               images: [],
               description: {},
            },
         } = response?.data;
         return { message, equipment };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
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

export const editEquipment = createAsyncThunk(
   'equipmentList/createTrainingType',
   async (
      {
         file = '',
         title = '',
         synopsis = '',
         trainingIds = '',
         token = '',
         equipmentId = '',
      },
      { rejectWithValue },
   ) => {
      const url = `${equipmentServiceURL}/${equipmentId}`;

      const body = {
         title,
         synopsis,
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
         const {
            message = '',
            equipment = {
               equipmentId: '',
               title: '',
               images: [],
               description: {},
            },
         } = response?.data;
         return { message, equipment };
      } catch (error) {
         if (error.response === undefined) {
            return rejectWithValue({
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

export const deleteEquipment = createAsyncThunk(
   'equipmentList/deleteTrainingType',
   async ({ equipmentId = '', token = '' }, { rejectWithValue }) => {
      const url = `${equipmentServiceURL}/${equipmentId}`;

      try {
         const response = await axios.delete(url, {
            headers: { 'Accept-Language': 'pl', Authorization: token },
         });
         const { message = '', equipment = {} } = response?.data;
         return { message, equipmentId: equipment?.equipmentId || '' };
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

const equipmentListSlice = createSlice({
   name: 'equipmentList',
   initialState,
   reducers: {
      clearMessage(state, action) {
         state.message = null;
      },
   },
   extraReducers: {
      [fetchEquipmentList.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [fetchEquipmentList.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         equipmentListAdapter.upsertMany(state, action.payload);
         state.notistack = NOTISTACK.SUCCESS;
         state.error = null;
      },
      [fetchEquipmentList.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.error = action.payload.error;
         state.message = action.payload.message;
         state.notistack = action.payload.notistack;
      },

      [addEquipment.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [addEquipment.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         equipmentListAdapter.upsertOne(state, action.payload.equipment);
         state.error = null;
      },
      [addEquipment.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [editEquipment.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [editEquipment.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         equipmentListAdapter.upsertOne(state, action.payload.equipment);
         state.error = null;
      },
      [editEquipment.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },

      [deleteEquipment.pending]: (state, action) => {
         state.status = STATUS.LOADING;
      },
      [deleteEquipment.fulfilled]: (state, action) => {
         state.status = STATUS.SUCCEEDED;
         state.notistack = NOTISTACK.SUCCESS;
         state.message = action.payload.message;
         equipmentListAdapter.removeOne(state, action.payload.equipmentId);
         state.error = null;
      },
      [deleteEquipment.rejected]: (state, action) => {
         state.status = STATUS.FAILED;
         state.notistack = action.payload.notistack;
         state.error = action.payload.error;
         state.message = action.payload.message;
      },
   },
});

export default equipmentListSlice.reducer;

export const { clearMessage } = equipmentListSlice.actions;

export const { selectAll, selectById } = equipmentListAdapter.getSelectors(
   (state) => state.equipmentList,
);

export const selectMessage = (state) => state.equipmentList.message;
export const selectStatus = (state) => state.equipmentList.status;
export const selectError = (state) => state.equipmentList.error;
export const selectNotistack = (state) => state.equipmentList.notistack;
