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

const dateOptions = [7, 30, 365];

export const BitcoinChart = () => {

  const [historicalDataBitcoin, setHistoricalDataBitcoin] = useState([] as any[]);
  const [dateHistorical, setDateHistorical] = useState(365);
  const [isloading, setIsLoading] = useState(true);

  const theme = useTheme();
  const isColorLightkMode = theme.palette.mode === 'light' ? '#7476ED' : '#FFF';

  const fetchHistoricalData = async () => {
    const urlApi = `https://oynv41e6xi.execute-api.us-east-1.amazonaws.com/test/bitcoin/?_limit=${dateHistorical}&_skip=1`
    const { data } = await axios.get(urlApi);
    setIsLoading(false)

    return setHistoricalDataBitcoin(data.map((c: any) => ({
      date: new Date(c.date),
      price_usd: c.price_usd
    })).sort((a: any, b: any) => a.date - b.date)) as any;


  }

  useEffect(() => {
    fetchHistoricalData();
  }, [dateHistorical]);

  const updateDateHistorical = (date: any) => {
    if (date !== dateHistorical) {
      setIsLoading(true)
      setDateHistorical(date);
    }
  };

  const data = {
    labels: historicalDataBitcoin.map((coin) => {
      let date = new Date(coin.date)
      return date.toLocaleDateString();
    }),

    datasets: [
      {
        data: historicalDataBitcoin.map((coin) => coin.price_usd),
        label: `Bitcoin in ${dateHistorical} days`,
        yAxisID: 'yAxis',
        borderColor: isColorLightkMode,
        fill: true,
      }
    ]
  };

  const options = {
    scales: {
      yAxis: {
        // The axis for this scale is determined from the first letter of the id as `'x'`
        // It is recommended to specify `position` and / or `axis` explicitly.
        position: 'right',
        ticks: {
          color: isColorLightkMode,
        }
      },
      xAxis: {
        ticks: {
          color: isColorLightkMode,
        }
      }
    }
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
          {(isloading) ?
            (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <CircularProgress
                  style={{ color: isColorLightkMode }}
                  size={250}
                  thickness={1}
                />
              </Box>
            ) : (
              <>
                <Line options={options as any} data={data as any}
                  style={{
                    maxHeight: 1500,
                    maxWidth: 1300,
                    [theme.breakpoints.down(900)]: {
                      height: 1000,

                    }
                  }}
                />
              </>
            )
          }
        </Box>
        <Box
          sx={{
            width: 'inherit',
            display: 'flex',
            justifyContent: 'space-between'
          }}
          mt={2}
        >
          {dateOptions.map((option) => {
            return (
              <>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    paddingTop: 1,
                    paddingBottom: 1,
                    paddingLeft: 3,
                    paddingRight: 3,
                    border: `3px solid pink`,
                    borderRadius: 2,
                    fontWeight: 700,
                    '&:hover': {
                      backgroundColor: 'pink',
                      color: '#7476ED'
                    }
                  }}
                  onClick={() => updateDateHistorical(option)}
                >
                  {option} days
                </Typography>
              </>
            )
          })}
        </Box>
      </Box>
    </Box >
  )
}
