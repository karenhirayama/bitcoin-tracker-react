import { Box, Typography } from '@mui/material'
import React from 'react'

export const BitcoinChart = () => {
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
