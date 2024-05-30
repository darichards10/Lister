import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query; 
   
    return res.status(200).json({}); // Respond with an empty JSON object
  } catch (error) {
    console.error('Error fetching lists:', error);
    return res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error message
  }
}
