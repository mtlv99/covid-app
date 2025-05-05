import { useDispatch, useSelector } from 'react-redux';
import { onClearActiveDiagnose, onCloseDiagnosisModal, onOpenDiagnosisModal } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDiagnosisModalOpen } = useSelector((state) => state.ui);

  const openDiagnosisModal = () => {
    dispatch(onOpenDiagnosisModal());
  };

  const closeDiagnosisModal = () => {
    dispatch(onCloseDiagnosisModal());
    dispatch(onClearActiveDiagnose());
  };

  const toggleDiagnosisModal = () => {
    // eslint-disable-next-line no-unused-expressions
    isDiagnosisModalOpen ? closeDiagnosisModal() : openDiagnosisModal();
  };

  return {
    // Propiedades
    isDiagnosisModalOpen,

    // Metodos
    openDiagnosisModal,
    closeDiagnosisModal,
    toggleDiagnosisModal,
  };
};
