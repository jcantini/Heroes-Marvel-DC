import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // importo el Router

import HeroesApp from './HeroesApp';
import './styles.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* agrego el router */}
      < HeroesApp />
    </BrowserRouter>
  </React.StrictMode>,
)
