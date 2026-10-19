import { SocialItems } from './Data/SocialItems';
import { returnLibraryIcons } from './Models/SocialItem';

type SocialIconsProps = { className?: string };

export const SocialIcons = ({ className }: SocialIconsProps) => {
  return (
    <div className='flex flex-row items-center justify-center space-x-3'>
      {SocialItems.map((item) => {
        const Icon = returnLibraryIcons(item.name);

        return (
          <a
            key={item.name}
            aria-label={`Follow on ${item.name}`}
            className='group relative rounded-full bg-gray-100 p-2 transition-colors duration-150 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            href={item.link}
            rel='noreferrer'
            target='_blank'
          >
            <Icon
              className={`group-hover:text-brand-text dark:group-hover:text-brand-text text-gray-600 transition-colors duration-150 dark:text-gray-300 ${className}`}
              size={20}
            />
          </a>
        );
      })}
    </div>
  );
};
