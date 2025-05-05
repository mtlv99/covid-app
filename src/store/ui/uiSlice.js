import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDiagnosisModalOpen: false,
  },
  reducers: {
    onOpenDiagnosisModal: (state) => {
      state.isDiagnosisModalOpen = true;
    },
    onCloseDiagnosisModal: (state) => {
      state.isDiagnosisModalOpen = false;
    },
  },
});

export const { onOpenDiagnosisModal, onCloseDiagnosisModal } = uiSlice.actions;
