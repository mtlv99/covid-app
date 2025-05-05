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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useUiStore } from '../../hooks';

export const CovidModal = () => {
  const { isDiagnosisModalOpen, closeDiagnosisModal } = useUiStore();
  const [selectedFilter, setSelectedFilter] = useState('normal');
  const [originalImage, setOriginalImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleApplyFilter = () => {
    setFilteredImage(originalImage);
  };

  const handlePredict = () => {
    setPrediction('Tienes covid');
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
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Nuevo Diagnóstico</Typography>
          <IconButton
            aria-label="cerrar"
            onClick={closeDiagnosisModal}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box display="flex" gap={3}>
          {/* Panel de filtros */}
          <Box
            flex={1}
            border="1px solid black"
            borderRadius={1}
            p={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Filtros:</FormLabel>
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
              sx={{ mt: 4, width: '80%' }}
              onClick={handleApplyFilter}
            >
              Aplicar filtro
            </Button>
          </Box>

          {/* Imágenes */}
          <Box flex={2} display="flex" gap={2} justifyContent="center">
            <Box
              width="100%"
              height={250}
              border="2px solid black"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography>[Imagen original]</Typography>
            </Box>
            <Box
              width="100%"
              height={250}
              border="2px solid black"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography>[imagen con filtro]</Typography>
            </Box>
          </Box>
        </Box>

        {/* Botón de predicción */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            onClick={handlePredict}
          >
            Predecir
          </Button>
        </Box>

        {/* Resultado */}
        <Box mt={2} textAlign="center">
          <Typography>
            {prediction || 'Tienes covid / Neumonía / Estás sano'}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
