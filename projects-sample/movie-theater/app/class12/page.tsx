'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import useApi from '../hooks/useApi';

export interface StockType {
  isin: string;
  exchange: string;
  code: string;
  name: string;
  symbol: string;
  fullName: string;
  clientName: string;
  clientNameEn: string;
  type: 's' | 'f';
}

export interface StockCodeDetailType {
  name: string;
  symbol: string;
  symbolRef: null;
  'exchange-traded': string;
  'exchange-listed': string;
  timezone: string;
  minmov: number;
  minmov2: number;
  pointvalue: number;
  pricescale: number;
  session: string;
  has_intraday: boolean;
  intraday_multipliers: string[];
  supported_resolutions: string[];
  has_no_volume: boolean;
  data_status: string;
  has_empty_bars: boolean;
  has_daily: boolean;
  has_weekly_and_monthly: boolean;
  type: string;
  ticker: string;
  stockNo: string;
  stockType: string;
  listed_exchange: string;
  exchange: string;
  stockTypeCode: 's';
}

function Class12() {
  const [searchKey, setSearchKey] = useState('');

  const [stockCode, setStockCode] = useState<string | null>(null); // ACV
  // const [stockCodeDetail, setStockCodeDetail] =
  //   useState<StockCodeDetailType | null>(null); // {code: 'ACV',  description: 'ACV',...}

  const dataStockList = useApi(
    `http://localhost:3001/api/stock-list?query=${searchKey}`,
    'stock list'
  );

  const stockList: StockType[] = dataStockList.data?.data;

  const dataStockCodeDetail = useApi(
    `http://localhost:3001/api/stock-detail?query=${stockCode}`,
    'stock code detail'
  );
  const stockCodeDetail: StockCodeDetailType = dataStockCodeDetail.data?.data;

  console.log(stockList, stockCodeDetail);

  // useEffect(() => {
  //   async function fetchApiGetStockCodeDetail(url: string) {
  //     try {
  //       // template literal
  //       setTimeout(() => {
  //         toast.info('Start fetch data stock code detail');
  //       }, 100);

  //       const res: AxiosResponse = await axios.get(url);
  //       setStockCodeDetail(res.data.data);
  //       setTimeout(() => {
  //         toast.success('Fetch data success stock code detail');
  //       }, 2000);
  //     } catch (error: unknown) {
  //       const axiosError = error as AxiosError<{ message: string }>;
  //       toast.error('Fetch data failed stock code detail', {
  //         description: axiosError.response?.data.message,
  //         duration: 3000,
  //       });
  //     }
  //   }

  //   if (stockCode) {
  //     const url = `http://localhost:3001/api/stock-detail?query=${stockCode}`;
  //     fetchApiGetStockCodeDetail(url);
  //   }

  //   return () => {};
  // }, [stockCode]);

  return (
    <div className='flex flex-col gap-4 ml-20 mt-20 max-w-[40rem]'>
      <div className='flex gap-2'>
        <Input
          type='text'
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <Button>Search</Button>
      </div>
      <div>
        <ol className='list-decimal'>
          {stockList?.map((stock: StockType, index: number) => (
            <li
              key={stock.code}
              className='flex gap-2 cursor-pointer'
              onClick={() => setStockCode(stock.code)}
            >
              {index + 1}. {stock.code} - {stock.clientName} - {stock.exchange}
            </li>
          ))}
        </ol>
      </div>{' '}
      <h2>Stock Code Detail</h2>
      <div>
        <h1>{stockCodeDetail?.stockNo}</h1>
        <p>{stockCodeDetail?.exchange}</p>
      </div>
    </div>
  );
}

export default Class12;
