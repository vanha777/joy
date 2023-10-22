import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import MediaPages from './Dashboard/MediaPages';
import FilePages from './Dashboard/FilePages';
import SigninPages from './Pages/SigninPages';
import { Apps } from '@mui/icons-material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
