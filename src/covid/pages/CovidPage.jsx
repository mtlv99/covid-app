import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CovidModal } from '../components/CovidModal';
import { FabAddNew } from '../components/FabAddNew';
import { useCovidStore } from '../../hooks';
import { CovidTable } from '../components/CovidTable';
import { LayoutBase } from '../components/LayoutBase';

export const CovidPage = () => {
  const { diagnoses, startLoadingImageList } = useCovidStore();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    startLoadingImageList({ pageNumber: 1, pageSize: 5 });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <LayoutBase>
      <Box display="flex" alignItems="center" justifyContent="space-between">
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

      <CovidTable data={diagnoses} />

      <CovidModal />
      <FabAddNew />
    </LayoutBase>
  );
};
