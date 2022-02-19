import { LensTwoTone } from '@mui/icons-material';

interface Data {
  name: string;
  currentPrice: string;
  rateOfChange: string;
  money: string;
  id: string;
}

const coinDataUtils = {
  init: (data: any, state: any) => {
    const newData: any = [];
    data.forEach((coin: any) => {
      newData.push({
        symbol: coin.content.symbol,
        tickType: coin.content.tickType,
        openPrice: coin.content.openPrice,
        closePrice: coin.content.closePrice,
        lowPrice: coin.content.lowPrice,
        highPrice: coin.content.highPrice,
        value: coin.content.value,
        volume: coin.content.volume,
        sellVolume: coin.content.sellVolume,
        buyVolume: coin.content.buyVolume,
        prevClosePrice: coin.content.prevClosePrice,
        chgRate: coin.content.chgRate,
        chgAmt: coin.content.chgAmt,
        time: coin.content.time,
      });
    });
    return newData;
  },
  update: (data: any, state: any) => {
    const targetCoin = state.coin.conList;
    // console.log('state:', targetCoin, 'data:', data);
  },
  convertData: (data: any) => {
    let newData: any = [];
    if (data.coinList.length) {
      newData = data.coinList.map((coin: any) => {
        return {
          id: coin.content.symbol,
          name: coin.content.symbol,
          currentPrice: `${parseInt(coin.content.closePrice, 10).toLocaleString()}원`,
          rateOfChange: coin.content.chgRate,
          money: `${parseInt(coin.content.value, 10).toLocaleString()}원`,
          color: coin.color,
          changeCell: coin.changeCell,
        };
      });
    }
    return newData || [];
  },
};
export { coinDataUtils };
