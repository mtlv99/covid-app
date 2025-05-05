import { useDispatch, useSelector } from 'react-redux';
import {
  onSetActiveDiagnoseUrl, onLoadImageList, onSetActiveDiagnosePrediction,
  onClearActiveDiagnose, onStartLoadingImageList,
} from '../store';
import { covidApi } from '../api';

export const useCovidStore = () => {
  const dispatch = useDispatch();
  const { diagnoses, activeDiagnose } = useSelector((state) => state.covid);

  // { rawUrl, filterUrl, filterType }
  const setActiveDiagnoseUrls = (diagnose) => {
    dispatch(onSetActiveDiagnoseUrl(diagnose));
  };

  // { rawUrl, filterUrl, filterType }
  const setActiveDiagnosePrediction = (diagnose) => {
    dispatch(onSetActiveDiagnosePrediction(diagnose));
  };

  const clearActiveDiagnose = () => {
    dispatch(onClearActiveDiagnose());
  };

  const startLoadingImageList = async ({ pageNumber = 1, pageSize = 5 }) => {
    try {
      dispatch(onStartLoadingImageList());

      const { data: foundData } = await covidApi.post(`/images/?page=${pageNumber}&page_size=${pageSize}`);

      dispatch(onLoadImageList(foundData));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error cargando imagenes', error);
    }
  };

  return {
    // Propiedades
    diagnoses,
    activeDiagnose,
    hasSelectedImage: !!activeDiagnose.originalUrl,
    // Metodos
    setActiveDiagnoseUrls,
    setActiveDiagnosePrediction,
    startLoadingImageList,
    clearActiveDiagnose,
  };
};
