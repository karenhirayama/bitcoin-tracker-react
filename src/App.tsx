import React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { BitcoinChart } from './components/BitcoinChart/BitcoinChart';
import { ProfitCalculator } from './components/Calculation/ProfitCalculator/ProfitCalculator';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CircleIcon from '@mui/icons-material/Circle';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

function MyApp() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const changeMode = () => {
    colorMode.toggleColorMode();
  }

  const isDarkMode = theme.palette.mode === 'dark';
  const isColorLightkMode = theme.palette.mode === 'light' ? '#FFF' : '#7476ED';
  const isColorDarkMode = theme.palette.mode === 'dark' ? '#FFF' : '#7476ED';

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: `1px solid ${isColorDarkMode}`
        }}
      >
        <Box
          sx={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          mt={1}
          mb={1}
        >
          <CurrencyBitcoinIcon sx={{fontSize: 40}}/>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box mr={2}>
              <AutoGraphIcon
                sx={{ fontSize: 48 }}
              />
            </Box>
            <Box
              sx={{ cursor: 'pointer', backgroundColor: isColorDarkMode, color: isColorLightkMode, height: 'fit-content' }}
              onClick={changeMode}
              pt={0.3}
              pr={0.4}
              pl={0.4}
              borderRadius={5}
            >
              <CircleIcon
                sx={
                  isDarkMode
                    ?
                    { fontSize: 20, paddingRight: 3 }
                    :
                    { fontSize: 20, paddingLeft: 3 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <BitcoinChart />
      <ProfitCalculator />
    </Box >
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...(mode === 'light'
            ? {
              // palette values for light mode
              primary: blue,
              text: {
                primary: '#192657',
              },
              focus: {
                primary: '#192657',
              },
            }
            : {
              // palette values for dark mode
              background: {
                default: '#192657',
              },
              text: {
                primary: '#fff',
              },
              focus: {
                primary: '#FFF',
              },
              mode: 'dark'
            }),
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}