import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
// icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';


import { invoke } from '@tauri-apps/api'
import ColorSchemeToggle from '../components/ColorSchemeToggle';
import OrderTable from '../components/OrderTable';
import OrderList from '../components/OrderList';
import MyProfile from '../components/MyProfile';
import ContentHub from '../Dashboard/ContentHub/ContentHub';
import VideoStudio from '../Dashboard/VideoStudio/VideoStudio';

export default function OrderPages() {
    return (
<Box
component="main"
className="MainContent"
sx={{
  pt: {
    xs: 'calc(12px + var(--Header-height))',
    md: 3,
  },
  pb: {
    xs: 2,
    sm: 2,
    md: 3,
  },
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  height: '100dvh',
  gap: 1,
  overflow: 'auto',
}}
>
<VideoStudio />
</Box>
    )
}