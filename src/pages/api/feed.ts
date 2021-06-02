import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const feed = await axios.get(
    'https://normidpodcast.com/category/normid/feed/'
  );
  res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
  res.send(feed.data);
};
