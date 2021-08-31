import ReactDOM from 'react-dom';
import App from './app';
import React, { useEffect, useRef, useState } from 'react';

import { DAppProvider, useBlockNumber, useEthers } from '@usedapp/core';

// export default App;

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider
      config={{
        pollingInterval: 1,
      }}
    >
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
