export const Bitcoin = (id: string, days: number, currency: string) => {
    return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&day=${days}`
}