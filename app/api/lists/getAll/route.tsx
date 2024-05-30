import { getAllLists } from '../../../database/lib/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const lists = await getAllLists(); 
    return NextResponse.json(lists, { status: 200 }); 
  } catch (error) {
    console.error('Error fetching lists:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
