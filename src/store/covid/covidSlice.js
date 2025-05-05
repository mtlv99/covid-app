/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
export const covidSlice = createSlice({
  name: 'covid',
  initialState: {
    isLoadingImageList: true,
    imageList: {
      count: 0,
      num_pages: 0,
      results: [],
    },
    activeDiagnose: {
      originalUrl: '',
      processed: {
        url: '',
        filterType: '',
      },
      prediction: {
        label: '',
        confidence: 0,
      },
    },
  },
  reducers: {
    // { rawUrl, raw_url, processed_url } = payload
    onSetActiveDiagnoseUrl: (state, { payload }) => {
      state.activeDiagnose.url = payload.raw_url;
      state.activeDiagnose.processed.url = payload.processed_url;
      state.activeDiagnose.processed.filterType = payload.filterType;
    },
    // { prediction, confidence } = payload
    onSetActiveDiagnosePrediction: (state, { payload }) => {
      state.activeDiagnose.prediction.label = payload.label;
      state.activeDiagnose.prediction.confidence = payload.confidence;
    },
    onClearActiveDiagnose: (state) => {
      state.activeDiagnose = covidSlice.getInitialState().activeDiagnose;
    },
    onLoadImageList: (state, { payload = [] }) => {
      state.isLoadingImageList = false;
      state.imageList = payload;
    },
    onStartLoadingImageList: (state) => {
      state.isLoadingImageList = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveDiagnoseUrl, onSetActiveDiagnosePrediction, onClearActiveDiagnose,
  onLoadImageList, onStartLoadingImageList,
} = covidSlice.actions;
