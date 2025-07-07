// app/api/proxy-stock/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';

  const url = `https://iboard-api.ssi.com.vn/statistics/charts/symbol?symbol=${query}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json, text/plain, */*',
        origin: 'https://iboard.ssi.com.vn',
        referer: 'https://iboard.ssi.com.vn/',
        'user-agent': req.headers.get('user-agent') || '',
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Bypass CORS cho client
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
