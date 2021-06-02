import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cors from 'cors';

const cors = Cors();

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: any
) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  const feed = await axios.get(
    'https://normidpodcast.com/category/normid/feed/'
  );

  res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
  res.send(feed.data);
};
