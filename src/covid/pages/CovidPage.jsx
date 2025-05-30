import { useEffect, useState, useRef } from 'react';
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  ImageList,
  ImageListItem,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import { LayoutBase } from '../components/LayoutBase';
import { useCovidStore, useUiStore } from '../../hooks';
import { CovidModal } from '../components/CovidModal';

export const CovidPage = () => {
  const {
    imageList,
    startLoadingImageList,
    isLoadingImageList,
    startNewPrediction,
    uploadNewImage,
  } = useCovidStore();

  const [locationFilter, setLocationFilter] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const params = { pageNumber: 1, pageSize: 20 };
    if (locationFilter) {
      params.location = locationFilter;
    }
    startLoadingImageList(params);
  }, [locationFilter]);

  const handleImageClick = (image) => {
    startNewPrediction({ diagnoseOrigin: 'list', originalUrl: image.url, sourcePath: image.source_path });
  };

  const handleFilterChange = (_, newFilter) => {
    setLocationFilter(newFilter || '');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadNewImage(file);
    }
  };

  return (
    <LayoutBase>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Bienvenido (a)</Typography>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="p">Por favor selecciona o sube una imagen para empezar.</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
        <ToggleButtonGroup
          value={locationFilter}
          exclusive
          onChange={handleFilterChange}
          aria-label="Filtro por tipo"
        >
          <ToggleButton value="test">Test</ToggleButton>
          <ToggleButton value="train">Train</ToggleButton>
          <ToggleButton value="user_generated">User Generated</ToggleButton>
        </ToggleButtonGroup>

        <Box>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleUploadClick}
          >
            Agregar Imagen
          </Button>
        </Box>
      </Box>

      {isLoadingImageList ? (
        <ImageList cols={4} gap={16}>
          {Array.from({ length: 8 }).map(() => (
            <Skeleton
              key={crypto.randomUUID()}
              variant="rectangular"
              height={180}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </ImageList>
      ) : (
        <ImageList cols={4} gap={16}>
          {imageList.results?.map((image) => (
            <ImageListItem
              key={image.source_path}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: 2,
                '&:hover .chip-container': {
                  opacity: 1,
                },
              }}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.url}
                alt={image.source_path}
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <Box
                className="chip-container"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 1,
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              >
                <Chip
                  label={image.type}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                />
                <Chip
                  label={image.label}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <CovidModal />
    </LayoutBase>
  );
};
