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
    <h3 className='mb-6 text-center text-2xl font-bold md:text-left'>My (dreaming) Setup</h3>
    <Image
      priority
      alt='Daian Scuarissi setup image'
      className='rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105'
      height={300}
      src='/setup-image.png'
      style={{ width: 'auto', height: 'auto' }}
      width={420}
    />
  </div>
);

const SkillBadge = ({ skill }: { skill: Skill }) => (
  <span
    className='hover:bg-brand mt-2 mr-2 cursor-pointer rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-all duration-200 hover:scale-105 hover:text-white dark:bg-gray-700 dark:text-gray-200'
    role='button'
    tabIndex={0}
  >
    {skill.name}
  </span>
);

const SkillsSection = () => (
  <div className='flex flex-col items-center md:items-start'>
    <h3 className='mb-6 text-center text-2xl font-bold md:text-left'>My Skills</h3>
    <div className='flex flex-wrap justify-center md:justify-start' role='list'>
      {skills.map((skill, idx) => (
        <SkillBadge key={`${skill.name}-${idx}`} skill={skill} />
      ))}
    </div>
  </div>
);

const AboutContent = () => (
  <div className='space-y-6 text-lg lg:w-1/2'>
    <header>
      <h3 className='mb-6 text-center text-2xl font-bold md:text-left'>Get to know me!</h3>
    </header>

    <div className='space-y-4 text-center md:text-left'>
      <p className='leading-relaxed font-medium'>
        Hey there, I&apos;m <span className='text-brand font-bold'>Daian Scuarissi</span>, a{' '}
        <span className='text-brand font-semibold'>software engineer</span> with over 7 years of
        experience developing applications and web interfaces. My expertise lies in frontend
        technologies, and I have a passion for creating engaging and intuitive user experiences.
      </p>

      <p className='leading-relaxed font-medium'>
        I specialize in modern frontend frameworks like{' '}
        <span className='text-brand font-semibold'>React</span> and{' '}
        <span className='text-brand font-semibold'>Angular</span>, building responsive web
        applications and dynamic user interfaces. I&apos;m always{' '}
        <span className='text-brand underline decoration-2 underline-offset-4'>
          learning and improving my skills
        </span>{' '}
        to stay current with the latest technologies.
      </p>

      <p className='leading-relaxed font-medium'>
        Looking ahead, I&apos;m excited to continue growing as a software engineer and tackle
        challenging projects that showcase my expertise.{' '}
        <span className='underline decoration-2 underline-offset-4'>
          I&apos;m always open to new opportunities and eager to collaborate
        </span>{' '}
        with other passionate professionals.
      </p>
    </div>
  </div>
);

const AboutSection = () => {
  const asd = 0;

  return (
    <section aria-labelledby='about-heading' className='scroll-mt-16' id='about'>
      <div className='container mx-auto py-16 md:py-24'>
        <header className='mb-16 text-center'>
          <h2 className='mb-4 text-4xl font-bold md:text-5xl' id='about-heading'>
            About Me
          </h2>
          <div className='bg-brand mx-auto h-1 w-16 rounded-full' />
        </header>

        <div className='flex flex-col items-start gap-12 lg:flex-row lg:gap-16'>
          <AboutContent />

          <aside className='space-y-12 lg:w-1/2'>
            <SkillsSection />
            <ProfileImage />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
