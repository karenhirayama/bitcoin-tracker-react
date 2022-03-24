import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const ResultCalculator = (profitResult: any) => {
  const theme = useTheme();

  const result = profitResult?.profitResult;

  const proftValue = Math.round(result.profit_value * 100) / 100;
  const rentability = Math.round(result.rentability * 100) / 100;

  const isDarkMode = theme.palette.mode === 'dark' ? '#7476ED' : '#C994DF';

  const showData = !result || isNaN(proftValue) || isNaN(rentability);

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
      {showData ?
        (
          <Box p={2}>
            <CircularProgress
              style={{ color: '#192657', margin: 2 }}
              size={50}
              thickness={1}
            />
          </Box>
        )
        :
        <><CurrencyExchangeIcon
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
              ${proftValue}
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
              {rentability}%
            </Typography>
          </Box>
        </>}
    </Box>
  )
}
