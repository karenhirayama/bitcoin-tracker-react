import { useState } from 'react';
import { Box, FormControl, InputAdornment, Stack, TextField, Typography, useTheme } from '@mui/material';
import { ResultCalculator } from '../ResultCalculator/ResultCalculator';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Footer } from '../../Footer/Footer';
import axios from 'axios';

export const ProfitCalculator = () => {
  const [initialDate, setInitialDate] = useState<Date | null>(new Date(new Date().setDate(new Date().getDate() - 2)));
  const [initialValue, setInitialValue] = useState('');
  const [profitResult, setProfitResult] = useState([] as any[]);
  const YesterdayDate = new Date(new Date().setDate(new Date().getDate() - 2))?.toISOString().split('T')[0];
  const theme = useTheme();

  const [showResultCalculator, setShowResultCalculator] = useState(false);


  const getProfitResult = async (initialDate: any, YesterdayDate: any, initialValue: any) => {
    const ProfitResultApi = `https://oynv41e6xi.execute-api.us-east-1.amazonaws.com/test/funds/bitcoin/rentability?init_date=${initialDate}&end_date=${YesterdayDate}&invest_value=${initialValue}`
    const { data } = await axios.get(ProfitResultApi);
    return setProfitResult(data) as any;
  }

  const handleCalculator = () => {
    setShowResultCalculator(true);
    getProfitResult(initialDate?.toISOString().split('T')[0], YesterdayDate, initialValue);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          pr={2} pl={2}
        >
          <Typography variant='h6' mt={3} mb={2}
            sx={{
              display: 'flex',
              fontWeight: 400,
              backgroundColor: '#7476ED',
              color: '#FFF',
              borderRadius: 2,
              justifyContent: 'center',
              [theme.breakpoints.down(600)]: {
                fontSize: 12
              }
            }}
            pt={2} pb={2} pr={3} pl={3}
          >
            This project is not investment advice! Past performance is not an indication of future results.
          </Typography>
        </Box>
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
                  [theme.breakpoints.down(600)]: {
                    fontSize: 14
                  }
                }}
              >
                Crypto Profit Calculator
              </Typography>
              <CurrencyBitcoinIcon
                sx={{
                  fontSize: 34,
                  [theme.breakpoints.down(600)]: {
                    fontSize: 20
                  }
                }}
              />
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
                        sx={{
                          width: 200,
                          [theme.breakpoints.down(600)]: {
                            width: 130
                          }
                        }}
                      >
                        <DatePicker
                          views={['year', 'month', 'day']}
                          label='Initial Date'
                          minDate={new Date('2012-03-01')}
                          maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                          value={initialDate}
                          onChange={(newValue) => {
                            setInitialDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                      </Box>
                      <Box
                        mt={2} ml={3} mr={3}
                        sx={{
                          width: 200,
                          [theme.breakpoints.down(600)]: {
                            width: 130
                          }
                        }}
                      >
                        <TextField
                          type='number'
                          label='Investment'
                          value={initialValue}
                          onChange={(e: any) => setInitialValue(e.target.value)}
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
                          },
                          [theme.breakpoints.down(600)]: {
                            width: 100
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
              <ResultCalculator profitResult={profitResult} />
            </>
          }
        </Box>
      </Box>
      <Footer />
    </>
  )
}
