import { Github, Linkedin, Twitter, LucideIcon } from 'lucide-react';

export type SocialItem = {
  name: string;
  link: string;
  icon: string;
};

export const returnLibraryIcons = (lib: string): LucideIcon => {
  const LibraryIcons: { [key: string]: LucideIcon } = {
    Github: Github,
    Twitter: Twitter,
    Linkedin: Linkedin,
  };

  return LibraryIcons[lib];
};
