import { useRef, useState } from 'react';
import { Box, FormControl, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
import { ResultCalculator } from '../ResultCalculator/ResultCalculator';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Footer } from '../../Footer/Footer';

export const ProfitCalculator = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  const theme = useTheme();
  const ResultCalculatorDiv = useRef(document.createElement("div"))

  const [showResultCalculator, setShowResultCalculator] = useState(false);
  const handleCalculator = () => {
    setShowResultCalculator(true);
    ResultCalculatorDiv.current?.scrollIntoView();
  }

  console.log(ResultCalculatorDiv.current?.scrollIntoView())
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        mt={3}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(90deg, rgba(100, 194, 219, 0.49) 0%, rgba(116, 118, 237, 0.62) 34.63%, rgba(201, 148, 223, 0.67) 66.97%, rgba(229, 111, 140, 0.65) 100%)',
              width: '80%',
              borderRadius: 2,
            }}
            m={3}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              mt={4}
            >
              <Typography variant='h5'
                sx={{
                  fontWeight: 700,
                }}
              >
                Crypto Profit Calculator
              </Typography>
              <CurrencyBitcoinIcon sx={{ fontSize: 34 }} />
            </Box>
            <Box>
              <FormControl fullWidth variant="standard">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        [theme.breakpoints.down(1110)]: {
                          flexDirection: 'column'
                        }
                      }}
                      mb={5}
                    >
                      <Box
                        mt={2}
                        width={200}
                      >
                        <DatePicker
                          views={['year', 'month', 'day']}
                          label='Initial Date'
                          minDate={new Date('2012-03-01')}
                          maxDate={new Date()}
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                      </Box>
                      <Box
                        mt={2} ml={3} mr={3}
                        width={200}
                      >
                        <TextField
                          type='number'
                          label='Investment'
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          textAlign: 'center',
                          color: 'white',
                          width: 150,
                          backgroundColor: '#192657',
                          marginTop: 2,
                          padding: 2,
                          fontSize: 16,
                          borderRadius: 1,
                          fontWeight: 700,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#7476ED',
                          }
                        }}
                        onClick={handleCalculator}
                      >
                        Calculate
                      </Typography>
                    </Box>
                  </Stack>
                </LocalizationProvider>
              </FormControl>
            </Box>
          </Box>
          {/* Result */}
          {showResultCalculator &&
            <>
              <ResultCalculator />
            </>
          }
        </Box>
      </Box>
      <Footer />
      <div ref={ResultCalculatorDiv}></div>
    </>
  )
}
