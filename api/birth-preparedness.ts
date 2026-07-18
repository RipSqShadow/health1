import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const phone = req.query.phone || req.body?.phone;
  if (!phone) {
    return res.status(400).json({ error: 'Phone parameter is required' });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('birthPreparedness');

    if (req.method === 'GET') {
      const doc = await collection.findOne({ phone });
      return res.status(200).json(doc || {});
    }

    if (req.method === 'POST') {
      const data = { ...req.body };
      delete data._id;

      await collection.updateOne(
        { phone },
        { $set: { ...data, updatedAt: new Date() } },
        { upsert: true }
      );
      const updated = await collection.findOne({ phone });
      return res.status(200).json(updated);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Database connection error' });
  }
}
