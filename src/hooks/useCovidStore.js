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
    diagnoseOrigin = 'list', originalUrl = '',
  }) => {
    dispatch(onClearActiveDiagnose());
    dispatch(onSetNewActiveDiagnose({ diagnoseOrigin, originalUrl }));
    dispatch(onOpenDiagnosisModal());
  };

  const setActiveDiagnosePrediction = (diagnose) => {
    dispatch(onSetActiveDiagnosePrediction(diagnose));
  };

  const clearActiveDiagnose = () => {
    dispatch(onClearActiveDiagnose());
  };

  const uploadNewImage = async (file) => {
    console.log('uploadNewImage', file);
    dispatch(onClearActiveDiagnose());
    try {
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await covidApi.post('/process_image/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const originalUrl = response.data.raw_url;
        startNewPrediction({ diagnoseOrigin: 'upload', originalUrl });
        dispatch(onOpenDiagnosisModal());
      }

      return true;
    } catch (error) {
      console.error('Error fetching processed image', error);
      return null;
    }
  }

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
    uploadNewImage,
  };
};
