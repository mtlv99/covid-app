import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  ImageList,
  ImageListItem,
  Chip,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LayoutBase } from '../components/LayoutBase';
import { useCovidStore } from '../../hooks';

export const CovidPage = () => {
  const { imageList, startLoadingImageList } = useCovidStore();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    startLoadingImageList({ pageNumber: 1, pageSize: 20 });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageClick = (image) => {
    console.log('Clicked image:', image);
  };

  return (
    <LayoutBase>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Lista de Diagnósticos</Typography>
        <Button
          aria-controls="export-menu"
          aria-haspopup="true"
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
        >
          Exportar
        </Button>
        <Menu
          id="export-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {}}>Exportar a CSV</MenuItem>
        </Menu>
      </Box>

      <ImageList cols={4} gap={16}>
        {imageList.results?.map((image) => (
          <ImageListItem
            key={image.filename}
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
              alt={image.filename}
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
    </LayoutBase>
  );
};
