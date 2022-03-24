import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




export const BitcoinChart = () => {

  const [historicalDataBitcoin, setHistoricalDataBitcoin] = useState([] as any[]);
  const theme = useTheme();
  const isColorLightkMode = theme.palette.mode === 'light' ? '#7476ED' : '#FFF';

  const fetchHistoricalData = async () => {
    const urlApi = 'http://ec2-3-89-75-150.compute-1.amazonaws.com:8000/bitcoin/?_limit=365&_skip=1'
    const { data } = await axios.get(urlApi);
    return setHistoricalDataBitcoin(data.map((c: any) => ({
      date: new Date(c.date),
      price_usd: c.price_usd
    })).sort((a: any, b: any) => a.date - b.date)) as any;
  }

  useEffect(() => {
    fetchHistoricalData();
  }, []);

  const data = {
    labels: historicalDataBitcoin.map((coin) => {
      let date = new Date(coin.date)
      return date.toLocaleDateString();
    }),

    datasets: [
      {
        data: historicalDataBitcoin.map((coin) => coin.price_usd),
        label: `Price (Past 365 days) in Bitcoin`,
        borderColor: isColorLightkMode,
      }
    ]
  };


  const options = {
    point: {
      radius: 1,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Bitcoin Price Chart',
        color: isColorLightkMode,
      },
    },
  };

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
            width: '80%',
          }}
          mb={1}
        >
          {/* Chart */}
          {
            !historicalDataBitcoin ?
              (
                <CircularProgress
                  style={{ color: '#192657' }}
                  size={250}
                  thickness={1}
                />
              ) : (
                <>
                  <Line options={options} data={data}
                    style={{
                      maxHeight: 500,
                      maxWidth: 1300,
                    }}
                  />
                </>
              )
          }
        </Box>
      </Box>
    </Box >
  )
}
