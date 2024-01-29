import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Update the path based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Replace this with your actual authentication logic using Prisma
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && user.password === password) {
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
