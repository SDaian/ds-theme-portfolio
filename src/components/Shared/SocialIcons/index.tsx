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
            href={item.link}
            target='_blank'
            rel='noreferrer'
            aria-label={`Follow on ${item.name}`}
            className='group relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 transform hover:scale-110'
          >
            <Icon
              size={20}
              className={`text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 ${className}`}
            />
          </a>
        );
      })}
    </div>
  );
};
