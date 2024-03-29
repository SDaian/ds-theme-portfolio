import { createClient } from 'next-sanity';

const client = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'production',
  apiVersion: '2021-03-25',
  useCdn: process.env.NODE_ENV === 'production',
});

export default client;
