import client from '@/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { groq } from 'next-sanity';
import { ExperienceItem } from '../../typings';

type Data = {
  experiences: ExperienceItem[];
};

const query = groq`*[_type=="experience"]{
  company,
  isCurrentlyWorkingHere,
  dateStarted,
  dateEnded,
  jobTitle,
  technologies[]->{
    image,
    title
  }
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(query);
  const experiences: ExperienceItem[] = await client.fetch(query);

  console.log(experiences);
  res.status(200).json({ experiences });
}
