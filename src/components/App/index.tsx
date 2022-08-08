import React from 'react';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles } from '../../assets/styles/global';
import { Home } from '../../pages/Home';

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Home />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
