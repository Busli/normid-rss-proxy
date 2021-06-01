import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getDay, getHours, differenceInDays } from 'date-fns';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const currentDate = new Date();
  const filePath = path.resolve(`.`, `public/normid.xml`);
  const fileExists = fs.existsSync(filePath);
  const { mtime } = fs.statSync(filePath); // mtime is when data was last modified

  const day = getDay(currentDate); // Föstudagur er 5
  const hour = getHours(currentDate);
  const diff = differenceInDays(currentDate, mtime);

  if ((day === 5 && hour >= 7 && diff > 0) || !fileExists) {
    const feed = await axios.get(
      `https://normidpodcast.com/category/normid/feed/`,
    );
    fs.writeFileSync(filePath, feed.data);
  }

  const fileBuffer = fs.readFileSync(filePath);
  res.setHeader(`Content-Type`, `application/rss+xml; charset=UTF-8`);
  res.send(fileBuffer);
};
