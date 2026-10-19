import { Github, Linkedin, Twitter, LucideIcon } from 'lucide-react';

export type SocialItem = {
  name: string;
  link: string;
  icon: string;
};

export const returnLibraryIcons = (lib: string): LucideIcon => {
  const LibraryIcons: { [key: string]: LucideIcon } = {
    GitHub: Github,
    // lucide has no X logo, so X keeps the bird icon.
    X: Twitter,
    LinkedIn: Linkedin,
  };

  return LibraryIcons[lib];
};
