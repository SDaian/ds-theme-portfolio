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
            className='group relative transform rounded-full bg-gray-100 p-2 transition-all duration-300 hover:scale-110 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-blue-900'
            href={item.link}
            rel='noreferrer'
            target='_blank'
          >
            <Icon
              className={`text-gray-600 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400 ${className}`}
              size={20}
            />
          </a>
        );
      })}
    </div>
  );
};
