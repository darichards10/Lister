import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({}, { status: 200 }); 
  } catch (error) {
    console.error('Error fetching lists:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
