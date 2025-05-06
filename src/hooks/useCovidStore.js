/* eslint-disable no-console, camelcase */
import { useDispatch, useSelector } from 'react-redux';
import {
  onUpdateActiveDiagnoseFilteredImage,
  onLoadImageList,
  onSetActiveDiagnoseOriginalPrediction,
  onSetActiveDiagnoseFilteredPrediction,
  onClearActiveDiagnose,
  onStartLoadingImageList,
  onOpenDiagnosisModal,
  onSetNewActiveDiagnose,
} from '../store';
import { covidApi } from '../api';
import { getMediaSourcePathFromUrl } from '../helpers';

export const useCovidStore = () => {
  const dispatch = useDispatch();
  const { imageList, activeDiagnose, isLoadingImageList } = useSelector((state) => state.covid);

  const startNewPrediction = async ({
    diagnoseOrigin = 'list', originalUrl = '', sourcePath = '',
  }) => {
    dispatch(onClearActiveDiagnose());
    dispatch(onSetNewActiveDiagnose({ diagnoseOrigin, originalUrl, sourcePath }));
    dispatch(onOpenDiagnosisModal());
  };

  const uploadNewImage = async (file) => {
    dispatch(onClearActiveDiagnose());
    try {
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await covidApi.post('/process_image/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const originalUrl = response.data.raw_url;
        const sourcePath = response.data.source_path;
        startNewPrediction({ diagnoseOrigin: 'upload', originalUrl, sourcePath });
        dispatch(onOpenDiagnosisModal());
      }

      return true;
    } catch (error) {
      console.error('Error subiendo imagen', error);
      return null;
    }
  };

  const startLoadingFilteredImage = async ({ filterType = 'bilateral' }) => {
    try {
      const response = await covidApi.post(`/process_image/?filter=${filterType}&source_path=${activeDiagnose.sourcePath}`);
      const processedUrl = response.data.processed_url;

      dispatch(onUpdateActiveDiagnoseFilteredImage({ processedUrl, filterType }));
    } catch (error) {
      console.error('Error cargando filtro', error);
    }
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

  const startLoadingPredictions = async () => {
    try {
      // Original image prediction
      const response = await covidApi.post('/predict/', {
        source_path: getMediaSourcePathFromUrl(activeDiagnose.original.originalUrl),
        filter: activeDiagnose.processed.filterType,
      });
      const { prediction, confidence } = response.data;

      dispatch(onSetActiveDiagnoseOriginalPrediction({ label: prediction, confidence }));

      // Filtered image prediction
      const response_filter = await covidApi.post('/predict/', {
        source_path: getMediaSourcePathFromUrl(activeDiagnose.processed.url),
        filter: activeDiagnose.processed.filterType,
      });
      const { prediction: prediction_filter, confidence: confidence_filter } = response_filter.data;

      // eslint-disable-next-line max-len
      dispatch(onSetActiveDiagnoseFilteredPrediction({ label: prediction_filter, confidence: confidence_filter }));
    } catch (error) {
      console.error('Error cargando predicciones', error);
    }
  };

  const clearActiveDiagnose = () => {
    dispatch(onClearActiveDiagnose());
  };

  return {
    // Propiedades
    imageList,
    activeDiagnose,
    isLoadingImageList,
    hasSelectedImage: !!activeDiagnose.originalUrl,

    // Métodos
    startNewPrediction,
    startLoadingImageList,
    startLoadingFilteredImage,
    startLoadingPredictions,
    clearActiveDiagnose,
    uploadNewImage,
  };
};
