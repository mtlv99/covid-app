/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { useCovidStore, useUiStore } from '../../hooks';
import 'sweetalert2/dist/sweetalert2.min.css';

export const CovidModal = () => {
  const { closeDiagnosisModal, isDiagnosisModalOpen } = useUiStore();
  const { activeDiagnosis, startSavingDiagnosis } = useCovidStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      pregnancies: 0,
      glucose: 0,
      blood_pressure: 0,
      skin_thickness: 0,
      insulin: 0,
      bmi: 0,
      age: 0,
    },
  });

  useEffect(() => {
    if (activeDiagnosis) {
      reset({
        pregnancies: activeDiagnosis.pregnancies ?? 0,
        glucose: activeDiagnosis.glucose ?? 0,
        blood_pressure: activeDiagnosis.blood_pressure ?? 0,
        skin_thickness: activeDiagnosis.skin_thickness ?? 0,
        insulin: activeDiagnosis.insulin ?? 0,
        bmi: activeDiagnosis.bmi ?? 0,
        age: activeDiagnosis.age ?? 0,
      });
    } else {
      reset({
        pregnancies: 0,
        glucose: 0,
        blood_pressure: 0,
        skin_thickness: 0,
        insulin: 0,
        bmi: 0,
        age: 0,
      });
    }
  }, [activeDiagnosis, reset]);

  const onSubmit = async (data) => {
    await startSavingDiagnosis(data);
    closeDiagnosisModal();
  };

  const onCloseModal = () => {
    closeDiagnosisModal();
  };

  return (
    <Modal open={isDiagnosisModalOpen} onClose={onCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography variant="h6" align="center">Nuevo Diagnóstico</Typography>
        <Divider sx={{ my: 2 }} />

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Embarazos"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.pregnancies}
            helperText={errors.pregnancies?.message}
            inputProps={{ step: 1, min: 0 }}
            {...register('pregnancies', {
              required: 'Este campo es requerido',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Debe ser un número entero',
              },
              min: {
                value: 0,
                message: 'No puede ser negativo',
              },
            })}
          />

          <TextField
            label="Glucosa"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.glucose}
            helperText={errors.glucose?.message}
            inputProps={{ step: 0.01, min: 0.01 }}
            {...register('glucose', {
              required: 'Este campo es requerido',
              min: {
                value: 0.01,
                message: 'Debe ser mayor que 0',
              },
            })}
          />

          <TextField
            label="Presión Sanguínea"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.blood_pressure}
            helperText={errors.blood_pressure?.message}
            inputProps={{ step: 0.01, min: 0.01 }}
            {...register('blood_pressure', {
              required: 'Este campo es requerido',
              min: {
                value: 0.01,
                message: 'Debe ser mayor que 0',
              },
            })}
          />

          <TextField
            label="Grosor de la Piel"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.skin_thickness}
            helperText={errors.skin_thickness?.message}
            inputProps={{ step: 0.01, min: 0.01 }}
            {...register('skin_thickness', {
              required: 'Este campo es requerido',
              min: {
                value: 0.01,
                message: 'Debe ser mayor que 0',
              },
            })}
          />

          <TextField
            label="Insulina"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.insulin}
            helperText={errors.insulin?.message}
            inputProps={{ step: 0.01, min: 0.01 }}
            {...register('insulin', {
              required: 'Este campo es requerido',
              min: {
                value: 0.01,
                message: 'Debe ser mayor que 0',
              },
            })}
          />

          <TextField
            label="Índice de Masa Corporal"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.bmi}
            helperText={errors.bmi?.message}
            inputProps={{ step: 0.01, min: 0.01 }}
            {...register('bmi', {
              required: 'Este campo es requerido',
              min: {
                value: 0.01,
                message: 'Debe ser mayor que 0',
              },
            })}
          />

          <TextField
            label="Edad"
            type="number"
            fullWidth
            margin="normal"
            error={!!errors.age}
            helperText={errors.age?.message}
            inputProps={{ step: 1, min: 0 }}
            {...register('age', {
              required: 'Este campo es requerido',
              min: {
                value: 0,
                message: 'No puede ser negativo',
              },
            })}
          />

          <Divider sx={{ my: 2 }} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isValid}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
