import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  onAddNewDiagnosis, onDeleteDiagnosis, onSetActiveDiagnosis, onUpdateDiagnosis, onLoadDiagnoses,
} from '../store';
import { diabetesApi } from '../api';

export const useDiabetesStore = () => {
  const dispatch = useDispatch();
  const { diagnoses, activeDiagnosis } = useSelector((state) => state.diabetes);

  const setActiveDiagnosis = (diagnosis) => {
    dispatch(onSetActiveDiagnosis(diagnosis));
  };

  const startSavingDiagnosis = async (diagnosis) => {
    // Recordar que la manera de saber si debe crear un diagnosis nuevo, o actualizar
    // uno existente, es por medio de la existencia de un `id`.
    // eslint-disable-next-line no-underscore-dangle
    try {
      const { data } = await diabetesApi.post('/diagnoses/', diagnosis);

      dispatch(onAddNewDiagnosis({
        ...diagnosis,
        id: data.id,
        created: data.created,
        has_diabetes: data.has_diabetes,
      }));

      // Show a success toast when deletion is complete
      Swal.fire({
        icon: 'success',
        title: 'Diagnóstico agregado con éxito',
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error al guardar', error);
      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
      return false;
    }
  };

  const startDeletingDiagnosis = async (id) => {
    try {
      await diabetesApi.delete('/diagnoses/', {
        data: { id },
      });

      dispatch(onDeleteDiagnosis({ id }));

      // Show a success toast when deletion is complete
      Swal.fire({
        icon: 'success',
        title: 'Diagnóstico eliminado con éxito',
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error al borrar', error);
      Swal.fire('Error al borrar', error.response.data?.msg, 'error');
    }
  };

  const startLoadingDiagnoses = async () => {
    try {
      const { data } = await diabetesApi.get('/diagnoses');
      const foundDiagnoses = data.Diagnosis;

      dispatch(onLoadDiagnoses(foundDiagnoses));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error cargando diagnosticos', error);
    }
  };

  return {
    // Propiedades
    diagnoses,
    activeDiagnosis,
    hasDiagnosisSelected: !!activeDiagnosis,

    // Metodos
    setActiveDiagnosis,
    startSavingDiagnosis,
    startDeletingDiagnosis,
    startLoadingDiagnoses,
  };
};
