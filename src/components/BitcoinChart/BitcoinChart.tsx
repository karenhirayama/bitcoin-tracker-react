import { Box, CircularProgress, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Bitcoin } from '../Api/Api';

export const BitcoinChart = () => {

  const [historicalDataBitcoin, setHistoricalDataBitcoin] = useState([]);
  const [days, setDays] = useState(1);

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(Bitcoin('bitcoin', days, 'usd'));
    return setHistoricalDataBitcoin(data.prices) as any;
  }

  useEffect(() => {
    fetchHistoricalData();
  }, [days]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '80%',
        }}
      >
        <Typography variant='h4' mt={6} mb={3}
          sx={{
            fontWeight: 700
          }}
        >
          Bitcoin Price Chart
        </Typography>
        <Box
          sx={{
            border: '1px solid',
            width: '100%',
            height: 480,
          }}
        >
          {/* Chart */}
          
        </Box>
        <Typography variant='h6' mt={6} mb={2}
          sx={{
            display: 'flex',
            fontWeight: 400,
            backgroundColor: '#7476ED',
            color: '#FFF',
            borderRadius: 2,
            width: '100%',
            justifyContent: 'center'
          }}
          pt={2} pb={2} pr={3} pl={3}
        >
          This project is not investment advice! Past performance is not an indication of future results.
        </Typography>
      </Box>
    </Box>
  )
}
