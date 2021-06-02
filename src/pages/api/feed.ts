import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getDay, getHours, differenceInDays } from 'date-fns';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const currentDate = new Date();
  const filePath = path.resolve('.', 'public/normid.xml');
  console.log('filePath', filePath);
  const fileExists = fs.existsSync(filePath);
  console.log('fileExists', fileExists);
  let lastMod = new Date();

  if (fileExists) {
    console.log('if fileExists');
    const { mtime } = fs.statSync(filePath); // mtime is when data was last modified
    console.log('mtime', mtime);
    lastMod = mtime;
  }

  const day = getDay(currentDate); // Föstudagur er 5
  const hour = getHours(currentDate);
  const diff = differenceInDays(currentDate, lastMod);

  if ((day === 5 && hour >= 7 && diff > 0) || !fileExists) {
    console.log('getting new feed');
    const feed = await axios.get(
      'https://normidpodcast.com/category/normid/feed/',
    );
    fs.writeFileSync(filePath, feed.data);
    console.log('new feed created');
  }

  console.log('before getting fileBuffer');
  const fileBuffer = fs.readFileSync(filePath);
  console.log('after getting fileBuffer');
  res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
  res.send(fileBuffer);
};
