import { ExperienceItem } from '../typings';

export const fetchExperiences = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getExperiences`
  );

  const data = await res.json();
  const experiences: ExperienceItem[] = data.experiences;

  return experiences;
};
