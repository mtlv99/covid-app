/* eslint-disable camelcase */
import { useDispatch, useSelector } from 'react-redux';
import {
  onSetActiveDiagnoseUrl,
  onLoadImageList,
  onSetActiveDiagnosePrediction,
  onClearActiveDiagnose,
  onStartLoadingImageList,
  onOpenDiagnosisModal,
  onSetNewActiveDiagnose,
} from '../store';
import { covidApi } from '../api';

export const useCovidStore = () => {
  const dispatch = useDispatch();
  const { imageList, activeDiagnose, isLoadingImageList } = useSelector((state) => state.covid);

  const startNewPrediction = async ({
    diagnoseOrigin = 'list', imageUrl = '', file = null, filter = '',
  }) => {
    dispatch(onSetNewActiveDiagnose({ diagnoseOrigin }));
    try {
      let response;

      if (diagnoseOrigin === 'upload' && file) {
        const formData = new FormData();
        formData.append('image', file);
        if (filter) formData.append('filter', filter);

        response = await covidApi.post(`/upload/?${filter ? `filter=${filter}` : ''}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        dispatch(onOpenDiagnosisModal());
        return;
      }

      if (diagnoseOrigin === 'list') {
        dispatch(onSetActiveDiagnoseUrl({
          raw_url: imageUrl,
          processed_url: imageUrl,
          filterType: filter || 'normal',
        }));

        dispatch(onOpenDiagnosisModal());
      }

      // const { raw_url, processed_url } = response.data;
      // dispatch(onSetActiveDiagnoseUrl({
      //   raw_url,
      //   processed_url,
      //   filterType: filter || 'normal',
      // }));
    } catch (error) {
      console.error('Error al iniciar predicción', error);
    }
  };

  const setActiveDiagnosePrediction = (diagnose) => {
    dispatch(onSetActiveDiagnosePrediction(diagnose));
  };

  const clearActiveDiagnose = () => {
    dispatch(onClearActiveDiagnose());
  };

  const startLoadingImageList = async ({ pageNumber = 1, pageSize = 5, location = '' }) => {
    try {
      dispatch(onStartLoadingImageList());

      const url = `/images/?page=${pageNumber}&page_size=${pageSize}`;
      const locationParam = location ? `&location=${location}` : '';
      const { data: foundData } = await covidApi.post(url + locationParam);

      dispatch(onLoadImageList(foundData));
    } catch (error) {
      console.error('Error cargando imagenes', error);
    }
  };

  return {
    // Propiedades
    imageList,
    activeDiagnose,
    isLoadingImageList,
    hasSelectedImage: !!activeDiagnose.originalUrl,

    // Métodos
    startNewPrediction,
    setActiveDiagnosePrediction,
    startLoadingImageList,
    clearActiveDiagnose,
  };
};
