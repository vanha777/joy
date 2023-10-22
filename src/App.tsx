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

import useScript from './useScript';
import FirstSidebar from './components/FirstSidebar';
import SecondSidebar from './components/SecondSidebar';
import OrderTable from './components/OrderTable';
import OrderList from './components/OrderList';
import Header from './components/Header';
import ColorSchemeToggle from './components/ColorSchemeToggle';

import { invoke } from '@tauri-apps/api'
import OrderPages from './Pages/OrderPages';
import ProfilePages from './Pages/ProfilePages';
import GroupPages from './Pages/GroupPages';
import TeamPages from './Dashboard/TeamPages';


const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
  const [sidebarState, setSidebarState] = React.useState("ProfilePages");
  //test
  const message:string = "Hello Joy Boy"
  // access the rust pre-bundled global API functionsconst { invoke } = window.__TAURI__.tauri
   invoke('my_custom_command', { invokeMessage: message })
   // `invoke` returns a Promise
   .then((response) => console.log(response))
  //end.

  React.useEffect(() => {
    // Ensure the global Tauri API is available
      invoke("get_server_state")
        .then((response) => console.log(response))
        .catch((error) => console.error("Error invoking Rust command:", error));
  }, []);

  const getServerState =() => {
    invoke("get_server_state").then((response) =>console.log(response))
  }
  const changeServerState =(state:string) => {
    invoke("change_server_state",{newState:state}).then((response) =>console.log(response))
  }

  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== 'undefined') {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <FirstSidebar />
        <SecondSidebar state={sidebarState} setState={setSidebarState} />
        {sidebarState === "OrderPages" && <OrderPages />}
        {sidebarState === "ProfilePages" && <ProfilePages />}
        {sidebarState === "GroupPages" && <GroupPages />}
      </Box>
    </CssVarsProvider>
  );
}
