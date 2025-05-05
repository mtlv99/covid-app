import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DiabetesModal } from '../components/DiabetesModal';
import { FabAddNew } from '../components/FabAddNew';
import { useDiabetesStore } from '../../hooks';
import { DiabetesTable } from '../components/DiabetesTable';
import { LayoutBase } from '../components/LayoutBase';
import { exportToCSV } from '../utils/export-utils';

export const DiabetesPage = () => {
  const { diagnoses, startLoadingDiagnoses } = useDiabetesStore();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    startLoadingDiagnoses();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportCSV = () => {
    exportToCSV(diagnoses);
    handleClose();
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
          <MenuItem onClick={handleExportCSV}>Exportar a CSV</MenuItem>
        </Menu>
      </Box>

      <DiabetesTable data={diagnoses} />

      <DiabetesModal />
      <FabAddNew />
    </LayoutBase>
  );
};
