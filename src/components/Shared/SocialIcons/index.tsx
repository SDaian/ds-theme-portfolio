import { SocialItems } from './Data/SocialItems';
import { returnLibraryIcons } from './Models/SocialItem';

type SocialIconsProps = { className?: string };

export const SocialIcons = ({ className }: SocialIconsProps) => {
  return (
    <div className='flex flex-row items-center justify-center space-x-2 mb-1'>
      {SocialItems.map((item) => {
        const Icon = returnLibraryIcons(item.name);
        return (
          <a
            key={item.name}
            href={item.link}
            target='_blank'
            rel='noreferrer'
            aria-label={item.name}
          >
            <Icon
              size={30}
              className={`inline-block w-6 h-6 mx-2 md:text-neutral-500 hover:text-neutral-600 dark:text-neutral-100 ${className}`}
            />
          </a>
        );
      })}
    </div>
  );
};
