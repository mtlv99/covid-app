import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Divider,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useUiStore, useCovidStore } from '../../hooks';

export const CovidModal = () => {
  const { isDiagnosisModalOpen, closeDiagnosisModal } = useUiStore();
  const { activeDiagnose, startNewPrediction } = useCovidStore();

  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);

  // eslint-disable-next-line no-nested-ternary
  const predictionColor = activeDiagnose?.prediction?.label === 'covid'
    ? 'error.main'
    : activeDiagnose?.prediction?.label === 'neumonía'
      ? 'warning.main'
      : 'success.main';

  const handleApplyFilter = async () => {
    setIsLoading(true);
    await startNewPrediction(
      activeDiagnose.diagnoseOrigin,
      activeDiagnose.url,
      null,
      selectedFilter,
    );
    setIsLoading(false);
  };

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      alert('Predicción enviada');
      setIsPredicting(false);
    }, 1500);
  };

  const getImageComponent = ({ imageUrl, isFilter = false }) => {
    console.log({ imageUrl, isFilter });

    const label = isFilter ? 'Filtrada' : 'Original';
    const predictionLabel = isFilter ? 'Predicción (filtro):' : 'Predicción (original):';

    return (
      <Box key={label} flex={1} display="flex" flexDirection="column" alignItems="center">
        <Box
          position="relative"
          border="1px solid #ccc"
          borderRadius={2}
          height={250}
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={label}
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          ) : (
            <Typography variant="body2">
              [Selecciona un filtro]
            </Typography>
          )}
          <Chip
            label={label}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: '#fff',
            }}
          />
        </Box>
        <Box mt={1}>
          <Typography variant="subtitle2" textAlign="center">{predictionLabel}</Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: predictionColor }}
          >
            {activeDiagnose?.prediction?.label
              ? `${activeDiagnose.prediction.label} (${Math.round(activeDiagnose.prediction.confidence * 100)}%)`
              : 'Sin resultado'}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Modal open={isDiagnosisModalOpen} onClose={closeDiagnosisModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 1000,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          overflow: 'hidden',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Nuevo Diagnóstico</Typography>
          <IconButton aria-label="cerrar" onClick={closeDiagnosisModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <FormControl>
              <FormLabel>Filtros disponibles</FormLabel>
              <RadioGroup
                row
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <FormControlLabel value="normal" control={<Radio />} label="Normal" />
                <FormControlLabel value="bilateral" control={<Radio />} label="Bilateral" />
                <FormControlLabel value="canny" control={<Radio />} label="Canny" />
              </RadioGroup>
            </FormControl>
            <Button
              variant="outlined"
              onClick={handleApplyFilter}
              disabled={!activeDiagnose?.url || isLoading}
            >
              {isLoading ? <CircularProgress size={20} /> : 'Aplicar Filtro'}
            </Button>
          </Box>

          <Box flex={2} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            { getImageComponent({ imageUrl: activeDiagnose.originalUrl, isFilter: false }) }
            { getImageComponent({ imageUrl: activeDiagnose.processed.url, isFilter: true }) }
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handlePredict}
            disabled={!activeDiagnose?.processed?.url || isPredicting}
          >
            {isPredicting ? <CircularProgress size={20} /> : 'Predecir'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
