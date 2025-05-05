import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';

export const LayoutBase = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <AppBar position="fixed">
      <Toolbar>
        <CoronavirusIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Covid App
        </Typography>
      </Toolbar>
    </AppBar>

    {/* Contenido principal */}
    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      {children}
    </Box>
  </Box>
);
