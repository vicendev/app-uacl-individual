import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './router';
import ReactModal from 'react-modal';

import './styles/globalStyles.css';

function App({children}: PropsWithChildren) {
  ReactModal.setAppElement("#root");
  
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
