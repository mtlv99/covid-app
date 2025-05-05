import { Navigate, Route, Routes } from 'react-router-dom';
import { CovidPage } from '../covid';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<CovidPage />} />
    <Route path="/*" element={<Navigate to="/" />} />
  </Routes>
);
