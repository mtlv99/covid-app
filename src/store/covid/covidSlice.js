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
      diagnoseOrigin: '', // list or upload
      sourcePath: null, // used as an id
      original: {
        originalUrl: '',
        prediction: {
          label: '',
          confidence: 0,
        },
      },
      processed: {
        url: '',
        filterType: '',
        prediction: {
          label: '',
          confidence: 0,
        },
      },
    },
  },
  reducers: {
    // { diagnoseOrigin, originalUrl, sourcePath } = payload
    onSetNewActiveDiagnose: (state, { payload }) => {
      state.activeDiagnose.original.originalUrl = payload.originalUrl;
      state.activeDiagnose.diagnoseOrigin = payload.diagnoseOrigin;
      state.activeDiagnose.sourcePath = payload.sourcePath;
    },
    // { processed_url, filterType } = payload
    onUpdateActiveDiagnoseFilteredImage: (state, { payload }) => {
      state.activeDiagnose.processed.url = payload.processedUrl;
      state.activeDiagnose.processed.filterType = payload.filterType;
    },
    // { prediction, confidence } = payload
    onSetActiveDiagnoseOriginalPrediction: (state, { payload }) => {
      state.activeDiagnose.original.prediction.label = payload.label;
      state.activeDiagnose.original.prediction.confidence = payload.confidence;
    },
    // { prediction, confidence } = payload
    onSetActiveDiagnoseFilteredPrediction: (state, { payload }) => {
      state.activeDiagnose.processed.prediction.label = payload.label;
      state.activeDiagnose.processed.prediction.confidence = payload.confidence;
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
  onUpdateActiveDiagnoseFilteredImage, onSetActiveDiagnoseOriginalPrediction,
  onClearActiveDiagnose, onLoadImageList, onStartLoadingImageList,
  onSetNewActiveDiagnose, onSetActiveDiagnoseFilteredPrediction,
} = covidSlice.actions;
