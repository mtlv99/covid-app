import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDiabetesStore, useUiStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDiagnosisModal } = useUiStore();
  const { setActiveDiagnosis } = useDiabetesStore();

  const handleClickNew = () => {
    setActiveDiagnosis({
      // Si no tiene un id, significa que es un diagnosis nuevo.
      pregnancies: 0,
      glucose: 0,
      blood_pressure: 0,
      skin_thickness: 0,
      insulin: 0,
      bmi: 0,
      diabetes_pedigree_function: 0,
      age: 0,
      created: new Date(),
      has_diabetes: null,
    });
    openDiagnosisModal();
  };

  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  };

  return (
    <Fab variant="extended" color="primary" style={fabStyle} onClick={handleClickNew}>
      <Add sx={{ mr: 1 }} />
      Agregar
    </Fab>
  );
};
