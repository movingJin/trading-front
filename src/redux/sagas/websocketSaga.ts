/* eslint-disable no-param-reassign */
import { buffers, eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from '@redux-saga/core/effects';
import { flush, select, delay } from 'redux-saga/effects';
import {
  ICoinState,
  START_INIT,
  END_INIT,
} from '@redux/reducers/websocketReducer';
import { connectSocketSaga } from '@redux/reducers/websocketReducer';
// import axios from '@utils/coinAxios';
import axios from 'axios';
import {
  fetchCoinActions,
  FETCH_COIN_REQUEST,
} from '@redux/reducers/websocketReducer';

let wsConnection: any = null;
const createSocket = () => {
  const client = new WebSocket('wss://pubwss.bithumb.com/pub/ws');
  client.binaryType = 'arraybuffer';
  wsConnection = client;
  return client;
};
const connectSocket = (socket: any, action: any, buffer: any) => {
  return eventChannel((emit) => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "ticker",
          symbols: ['ADA_KRW','BCH_KRW','BTC_KRW','EOS_KRW','ETH_KRW','LINK_KRW','LTC_KRW','TRX_KRW','XLM_KRW','XRP_KRW'],
          tickTypes:['30M']
         })
      );
    };
    socket.onmessage = (event: any) => {
      // const arr = new Uint8Array(evt.data);
      const data = JSON.parse(event.data);
      if(data.type !== undefined && data.type === "ticker"){
      // console.log('socket onmessage: ', data);
        emit(data);
      }
    };
    socket.onerror = (error: any) => {
      console.dir(error);
    };
    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffer.none());
};

export const createConnectSocketSaga = (type: any, dataMapper: any) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  return function* (action = { payload: '' }): any {
    const client = yield call(createSocket);
    const clientChannel = yield call(
      connectSocket,
      client,
      action,
      buffers.expanding(500),
    );
    while (true) {
      try {
        // 약 200ms동안 메세지 모으는중...
        const datas = yield flush(clientChannel);
        const state = yield select();
        const res = take(END_INIT);
        if (datas.length) {
          // 이 문구 없으면 메시지를 받았든 받지 않았든 200ms 마다 항상 dispatch 작업을 해서 혼란 야기할 수 도 있음
          // newCoinList: 기존값 data: 새로 들어온 값
          let newCoinList: any = [...state.coin.coinList];
          const flagMap: any = {
            currentPrice: `currentPrice`,
            volume: `volume`,
          };
          newCoinList = newCoinList.map((data: any) => {
            return {
              ...data,
              color: 'false',
            };
          });
          datas.forEach((data: ICoinState) => {
            const symbol: string = data.content.symbol as string;
            // if (state.coin.coinList[symbol]) {
            const targetIdx = newCoinList.findIndex(
              (coin: any) => coin.content.symbol === symbol,
            );
            if (targetIdx !== -1) {
              if (
                newCoinList[targetIdx].content.time <
                data.content.time
              ) {
                newCoinList[targetIdx] = data;
                newCoinList[targetIdx].color = 'true';
              }
            } else {
              // 새로운 데이터면 그냥 넣음
              newCoinList.push(data);
            }
          });
          yield put({ type: SUCCESS, payload: newCoinList });
        }
      } catch (e) {
        yield put({ type: ERROR, payload: e });
      }
      yield delay(500); // 500ms 동안 대기
    }

  };
};

const coinAPI = () => {
  return axios.get('https://gateway.trading-bot.movingjin.com');
};
function* fetchCoin(): any {
  try {
    const res = yield call(coinAPI);
    yield put(fetchCoinActions.success(res.data));
  } catch (e) {
    yield put(fetchCoinActions.failure(e));
  }
}
export function* wsEndSaga(): any {
  const clientChannel = yield call(
    connectSocket,
    wsConnection,
    '',
    buffers.expanding(500),
  );
  clientChannel.unsubscribe();
}
export function* wsSaga(): any {
  yield connectSocketSaga({ payload: 'coinList' });
}
export function* watchLivePricesSaga() {
  yield takeEvery(START_INIT, wsSaga);
  yield takeEvery(FETCH_COIN_REQUEST, fetchCoin);
}
