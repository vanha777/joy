import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import MyMessages from '../components/MyMessages';

export default function JoyMessagesTemplate() {
    return (
          <Box component="main" className="MainContent" sx={{ flex: 1 }}>
            <MyMessages />
          </Box>
    );
  }