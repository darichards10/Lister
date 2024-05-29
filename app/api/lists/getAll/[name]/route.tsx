import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query; 
   
    return NextResponse.json({}, { status: 200 }); 
  } catch (error) {
    console.error('Error fetching lists:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
