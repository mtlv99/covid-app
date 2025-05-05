/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
export const diabetesSlice = createSlice({
  name: 'diabetes',
  initialState: {
    isLoadingDiagnoses: true,
    diagnoses: [],
    activeDiagnosis: null,
  },
  reducers: {
    onSetActiveDiagnosis: (state, { payload }) => {
      state.activeDiagnosis = payload;
    },
    onClearActiveDiagnosis: (state) => {
      state.activeDiagnosis = null;
    },
    onAddNewDiagnosis: (state, { payload }) => {
      state.diagnoses.push(payload);
      state.activeDiagnosis = null;
    },
    onUpdateDiagnosis: (state, { payload }) => {
      state.diagnoses = state.diagnoses.map((diagnosis) => {
        // Si el diagnosis coincide, entonces retorna lo que viene en el payload,
        // en vez de lo que está actualmente en el store.
        if (diagnosis.id === payload.id) {
          return payload;
        }
        return diagnosis;
      });
    },
    onDeleteDiagnosis: (state, { payload }) => {
      // Acá filtra por todos los elementos que NO tengan el id del diagnosis activo,
      // por que basicamente termina excluyendo/borrando el diagnosis activo.
      // También se debe comprobar si hay un diagnosis activo para poder borrar:
      // si no, tratará de leer un 'id' de una propiedad en null.
      state.diagnoses = state.diagnoses.filter((diagnosis) => diagnosis.id !== payload.id);
    },
    onLoadDiagnoses: (state, { payload = [] }) => {
      state.isLoadingDiagnoses = false;

      payload.forEach((diagnosis) => {
        const exists = state.diagnoses.some((dbDiagnosis) => dbDiagnosis.id === diagnosis.id);
        if (!exists) {
          state.diagnoses.push(diagnosis);
        }
      });
    },
    onLogoutDiagnoses: (state) => {
      state.isLoadingDiagnoses = true;
      state.diagnoses = [];
      state.activeDiagnosis = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveDiagnosis, onClearActiveDiagnosis, onAddNewDiagnosis,
  onUpdateDiagnosis, onDeleteDiagnosis, onLoadDiagnoses, onLogoutDiagnoses,
} = diabetesSlice.actions;
