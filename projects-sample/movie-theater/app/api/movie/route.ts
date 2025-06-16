// app/api/movie/route.ts

import { NextRequest, NextResponse } from 'next/server';
// const data = [
//   { id: 1, roomId: 1, name: 'Cinema room 1', seats: 60 },
//   { id: 2, roomId: 2, name: 'Cinema room 2', seats: 60 },
//   { id: 3, roomId: 3, name: 'Cinema room 3', seats: 60 },
//   { id: 4, roomId: 4, name: 'Cinema room 4', seats: 60 },
//   { id: 5, roomId: 5, name: 'Cinema room 5', seats: 60 },
//   { id: 6, roomId: 6, name: 'Cinema room 6', seats: 60 },
// ];
const PAGE_SIZE = 5;
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const search = searchParams.get('search') || '';
  // 1 --> 1 --> 5
  // 2 --> 6 --> 10
  const data = new Array(PAGE_SIZE).fill(0).map((_, index) => ({
    id: PAGE_SIZE * (currentPage - 1) + index + 1,
    roomId: PAGE_SIZE * (currentPage - 1) + index + 1,
    name: `Cinema room ${PAGE_SIZE * (currentPage - 1) + index + 1}`,
    seats: 60,
  }));
  
  
  let filteredData = data;
  if (search) {
    filteredData = data.filter((item) => item.name.includes(search));
  }

  return NextResponse.json({
    currentPage,
    data: filteredData,
  });
}
