import { Box, Typography, useTheme } from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const ResultCalculator = () => {
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark' ? '#7476ED' : '#C994DF';
  return (
    <Box
      sx={{
        backgroundColor: isDarkMode,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        justifyContent: 'space-around',
        borderRadius: 2
      }}
    >
      <CurrencyExchangeIcon
        sx={{
          color: '#FFF',
          fontSize: 150,
          marginLeft: 6,
          [theme.breakpoints.down(1020)]: {
            display: 'none'
          }
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 4,
        }}
      >
        <Typography
          variant='h6'
          fontWeight='700'
          color='#192657'
          textAlign='center'
        >
          Today’s Value of your $ investment:
        </Typography>
        <Typography
          variant='h4'
          fontWeight='700'
          color='#FFF'
        >
          $38,328.00
        </Typography>
        <Typography
          variant='h6'
          fontWeight='700'
          mt={2}
          color='#192657'
        >
          Return
        </Typography>
        <Typography
          variant='h4'
          fontWeight='700'
          color='#FFF'
        >
          +100%
        </Typography>
      </Box>
    </Box>
  )
}
