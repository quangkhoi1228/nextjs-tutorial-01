import { NextResponse } from "next/server";

const mockUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com' },
  { id: '4', name: 'David', email: 'david@example.com' },
  { id: '5', name: 'Eve', email: 'eve@example.com' },
];

export async function GET() {
  return NextResponse.json(mockUsers);
} 