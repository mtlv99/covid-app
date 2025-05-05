
import { Navigate, Route, Routes } from "react-router-dom";
import { DiabetesPage } from "../diabetes";


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DiabetesPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
