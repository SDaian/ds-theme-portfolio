import { IconType } from 'react-icons';
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai';

export type SocialItem = {
  name: string;
  link: string;
  icon: string;
};

export const returnLibraryIcons = (lib: string) => {
  const LibraryIcons: { [key: string]: IconType } = {
    Github: AiOutlineGithub,
    Twitter: AiOutlineTwitter,
    Linkedin: AiOutlineLinkedin,
  };

  return LibraryIcons[lib];
};
