import Image from 'next/image';

interface Skill {
  name: string;
  category: 'frontend' | 'framework' | 'tool';
}

const skills: Skill[] = [
  { name: 'React', category: 'frontend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'SASS', category: 'frontend' },
  { name: 'TailwindCSS', category: 'framework' },
  { name: 'Material UI', category: 'framework' },
  { name: 'NextJS', category: 'framework' },
  { name: 'Git', category: 'tool' },
  { name: 'GitHub', category: 'tool' },
];

const ProfileImage = () => (
  <div className='flex flex-col items-center md:items-start'>
    <h3 className='text-center text-2xl font-bold mb-6 md:text-left'>
      My (dreaming) Setup
    </h3>
    <Image
      className='shadow-2xl rounded-lg transition-transform duration-300 hover:scale-105'
      src='/setup-image.png'
      alt='Daian Scuarissi setup image'
      width={420}
      height={300}
      style={{ width: 'auto', height: 'auto' }}
      priority
    />
  </div>
);

const SkillBadge = ({ skill }: { skill: Skill }) => (
  <span
    className='bg-gray-200 dark:bg-gray-700 px-4 py-2 mr-2 mt-2 text-gray-700 dark:text-gray-200 rounded-md font-medium cursor-pointer transition-all duration-200 hover:bg-brand hover:text-white hover:scale-105'
    role='button'
    tabIndex={0}
  >
    {skill.name}
  </span>
);

const SkillsSection = () => (
  <div className='flex flex-col items-center md:items-start'>
    <h3 className='text-center text-2xl font-bold mb-6 md:text-left'>
      My Skills
    </h3>
    <div className='flex flex-wrap justify-center md:justify-start' role='list'>
      {skills.map((skill, idx) => (
        <SkillBadge key={`${skill.name}-${idx}`} skill={skill} />
      ))}
    </div>
  </div>
);

const AboutContent = () => (
  <div className='lg:w-1/2 text-lg space-y-6'>
    <header>
      <h3 className='text-center text-2xl font-bold mb-6 md:text-left'>
        Get to know me!
      </h3>
    </header>

    <div className='space-y-4 text-center md:text-left'>
      <p className='font-medium leading-relaxed'>
        Hey there, I&apos;m{' '}
        <span className='font-bold text-brand'>Daian Scuarissi</span>, a{' '}
        <span className='text-brand font-semibold'>software engineer</span> with
        over 7 years of experience developing applications and web interfaces.
        My expertise lies in frontend technologies, and I have a passion for
        creating engaging and intuitive user experiences.
      </p>

      <p className='font-medium leading-relaxed'>
        I specialize in modern frontend frameworks like{' '}
        <span className='text-brand font-semibold'>React</span> and{' '}
        <span className='text-brand font-semibold'>Angular</span>, building
        responsive web applications and dynamic user interfaces. I&apos;m always{' '}
        <span className='text-brand underline underline-offset-4 decoration-2'>
          learning and improving my skills
        </span>{' '}
        to stay current with the latest technologies.
      </p>

      <p className='font-medium leading-relaxed'>
        Looking ahead, I&apos;m excited to continue growing as a software
        engineer and tackle challenging projects that showcase my expertise.{' '}
        <span className='underline underline-offset-4 decoration-2'>
          I&apos;m always open to new opportunities and eager to collaborate
        </span>{' '}
        with other passionate professionals.
      </p>
    </div>
  </div>
);

const AboutSection = () => {
  return (
    <section
      aria-labelledby='about-heading'
      id='about'
      className='scroll-mt-16'
    >
      <div className='container mx-auto py-16 md:py-24'>
        <header className='text-center mb-16'>
          <h2
            id='about-heading'
            className='text-4xl md:text-5xl font-bold mb-4'
          >
            About Me
          </h2>
          <div className='w-16 h-1 mx-auto bg-brand rounded-full' />
        </header>

        <div className='flex flex-col lg:flex-row gap-12 lg:gap-16 items-start'>
          <AboutContent />

          <aside className='lg:w-1/2 space-y-12'>
            <SkillsSection />
            <ProfileImage />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
