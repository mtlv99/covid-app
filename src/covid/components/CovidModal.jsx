/* eslint-disable max-len */
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
  const { activeDiagnose, startLoadingFilteredImage, startLoadingPredictions } = useCovidStore();

  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);

  const getPredictionData = (predictionObj) => {
    // eslint-disable-next-line no-nested-ternary
    const color = predictionObj.prediction === 'covid'
      ? 'error.main'
      : predictionObj.prediction === 'neumonía'
        ? 'warning.main'
        : 'success.main';

    const { prediction, confidence } = predictionObj;

    return {
      color,
      prediction,
      confidence,
      available: !!predictionObj.prediction.confidence,
    };
  };
  const handleApplyFilter = async () => {
    setIsLoading(true);
    await startLoadingFilteredImage({ filterType: selectedFilter });
    setIsLoading(false);
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    await startLoadingPredictions();
    setIsPredicting(false);
  };

  const getImageComponent = ({ imageUrl, isFilter = false, predictionObj }) => {
    const labelHtml = isFilter ? 'Filtrada' : 'Original';
    const predictionLabel = isFilter ? 'Predicción (filtro):' : 'Predicción (original):';
    const {
      color, prediction: { confidence, label }, available,
    } = getPredictionData(predictionObj);

    return (
      <Box key={labelHtml} flex={1} display="flex" flexDirection="column" alignItems="center">
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
              alt={labelHtml}
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          ) : (
            <Typography variant="body2">
              [Selecciona un filtro]
            </Typography>
          )}
          <Chip
            label={labelHtml}
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
            sx={{ color }}
          >
            {available
              ? `${label} (${Math.round(confidence * 100)}%)`
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
                <FormControlLabel value="normal" control={<Radio />} label="Normal" disabled />
                <FormControlLabel value="bilateral" control={<Radio />} label="Bilateral" />
                <FormControlLabel value="canny" control={<Radio />} label="Canny" />
              </RadioGroup>
            </FormControl>
            <Button
              variant="outlined"
              onClick={handleApplyFilter}
              sx={{ mt: 1 }}
            >
              {isLoading ? <CircularProgress size={20} /> : 'Aplicar Filtro'}
            </Button>

            <Box display="flex" flexDirection="column" gap={1} justifyContent="space-between" mt={2}>
              <Typography variant="p" sx={{ color: 'text.secondary' }}>El sistema puede ayudar a predecir casos con exactidad, sin embargo puede equivocarse.</Typography>
              <Typography variant="p" sx={{ color: 'text.secondary' }}>Si sientes algun síntoma, por favor acude a un médico.</Typography>
            </Box>
          </Box>

          <Box flex={2} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            {getImageComponent({ imageUrl: activeDiagnose.original.originalUrl, isFilter: false, predictionObj: activeDiagnose.original })}
            {getImageComponent({ imageUrl: activeDiagnose.processed.url, isFilter: true, predictionObj: activeDiagnose.processed })}
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
