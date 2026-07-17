import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { phone, role } = req.body || {};
    if (!phone || !role) {
      return res.status(400).json({ error: 'Phone and role are required' });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    let user = await usersCollection.findOne({ phone, role });
    if (!user) {
      const newUser = {
        phone,
        role,
        createdAt: new Date(),
      };
      const result = await usersCollection.insertOne(newUser);
      user = {
        ...newUser,
        _id: result.insertedId,
      };
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Database connection error' });
  }
}
