import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'

import './App.module.css';
import App from './App.tsx';
import GlobalStyle from "./globalStyles.js";


createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <GlobalStyle />
    <App />
  </>
  // </StrictMode>,
);
