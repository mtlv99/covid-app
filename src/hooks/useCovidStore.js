import { useDispatch, useSelector } from 'react-redux';
import {
  onSetActiveDiagnoseUrl, onLoadImageList, onSetActiveDiagnosePrediction,
  onClearActiveDiagnose, onStartLoadingImageList, onOpenDiagnosisModal,
  onSetNewActiveDiagnose,
} from '../store';
import { covidApi } from '../api';

export const useCovidStore = () => {
  const dispatch = useDispatch();
  const { imageList, activeDiagnose, isLoadingImageList } = useSelector((state) => state.covid);

  const startNewPrediction = (diagnoseOrigin = 'list', url = '', file = null) => {
    dispatch(onSetNewActiveDiagnose({ diagnoseOrigin }));
    dispatch(onOpenDiagnosisModal());
  };

  // { rawUrl, filterUrl, filterType }
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
      // eslint-disable-next-line no-console
      console.error('Error cargando imagenes', error);
    }
  };

  return {
    // Propiedades
    imageList,
    activeDiagnose,
    isLoadingImageList,
    hasSelectedImage: !!activeDiagnose.originalUrl,
    // Metodos
    startNewPrediction,
    setActiveDiagnosePrediction,
    startLoadingImageList,
    clearActiveDiagnose,
  };
};
