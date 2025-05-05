import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, IconButton } from '@mui/material';
import { useDiabetesStore } from '../../hooks';

const getDiabetesStatus = (hasDiabetes) => {
  const hasDiabetesColor = hasDiabetes ? 'error' : 'success';
  const hasDiabetesLabel = hasDiabetes ? 'Tiene diabetes' : 'No tiene diabetes';
  return <Chip label={hasDiabetesLabel} color={hasDiabetesColor} />;
};

export const DiabetesTable = ({ data = [] }) => {
  const { startDeletingDiagnosis } = useDiabetesStore();

  const handleDiagnosisDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Una vez eliminado, no podrás recuperar este diagnóstico. (ID ${id})`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingDiagnosis(id);
      }
    });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Embarazos</TableCell>
            <TableCell align="right">Glucosa</TableCell>
            <TableCell align="right">Presión Sanguínea</TableCell>
            <TableCell align="right">Grosor piel</TableCell>
            <TableCell align="right">Insulina</TableCell>
            <TableCell align="right">IMC</TableCell>
            <TableCell align="right">Pedigree</TableCell>
            <TableCell align="right">Edad</TableCell>
            <TableCell align="right">Creado</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">-</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.pregnancies}</TableCell>
              <TableCell align="right">{row.glucose}</TableCell>
              <TableCell align="right">{row.blood_pressure}</TableCell>
              <TableCell align="right">{row.skin_thickness}</TableCell>
              <TableCell align="right">{row.insulin}</TableCell>
              <TableCell align="right">{row.bmi}</TableCell>
              <TableCell align="right">{row.diabetes_pedigree_function}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{new Date(row.created).toLocaleDateString()}</TableCell>
              <TableCell align="right">{getDiabetesStatus(row.has_diabetes)}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" onClick={() => handleDiagnosisDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
