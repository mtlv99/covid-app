import React from 'react';
import ReactDOM from 'react-dom/client';
import { DiabetesApp } from './DiabetesApp';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DiabetesApp />
  </React.StrictMode>,
);
