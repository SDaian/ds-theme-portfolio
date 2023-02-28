const skills = [
  { skill: 'Angular' },
  { skill: 'React' },
  { skill: 'TypeScript' },
  { skill: 'JavaScript' },
  { skill: 'HTML' },
  { skill: 'CSS' },
  { skill: 'SASS' },
  { skill: 'TailwindCSS' },
  { skill: 'Material UI' },
  { skill: 'NextJS' },
  { skill: 'Git' },
  { skill: 'GitHub' },
];

const AboutSection = () => {
  return (
    <section aria-label='about' id='about'>
      <div className='my-12 pb-12 md:pt-16 md:pb-40'>
        <h2 className='text-center font-bold text-4xl'>
          About Me
          <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded'></hr>
        </h2>
        <div className='flex flex-col space-y-10 items-stretch justify-center align-top md:flex-row md:text-left md:p-4 md:space-y-0 md:space-x-10'>
          <div className='md:w-1/2'>
            <h3 className='text-center text-2xl font-bold mb-6 md:text-left'>
              Get to know me!
            </h3>
            <p className='mb-3'>
              Hi, my name is <span className='font-bold'>Daian</span> and I am a
              software engineer.
            </p>
            <p className='mb-2'>
              I am a <span className='text-teal-500'>software engineer</span>{' '}
              with over 5 years of experience developing applications and web
              interfaces. My expertise lies in frontend technologies such as
              HTML, CSS, JavaScript, Angular, and React. I have a passion for
              creating engaging and intuitive user experiences and am always
              looking for ways to improve my skills and stay up-to-date with the
              latest technologies.
            </p>{' '}
            <p className='mb-2'>
              I have worked on a variety of projects, including the development
              of a responsive web application using Angular and the
              implementation of a dynamic user interface using React. I am also
              proficient in frontend frameworks such as{' '}
              <span className='text-teal-500'>Angular</span> and{' '}
              <span className='text-teal-500'>React</span>, and I am always
              looking to <span className="text-teal-500 underline underline-offset-4">learn and improve my skills</span>.
            </p>{' '}
            <p className='mb-2'>
              In the future, I hope to continue growing as a software engineer
              and to work on challenging and rewarding projects that allow me to
              showcase my skills and experience.{' '}
              <span className='underline underline-offset-4'>
                I am always open to new opportunities and am eager to learn from
                other experienced professionals in the field
              </span>
              .
            </p>
          </div>
          <div className='md:w-1/2'>
            <h3 className='text-center text-2xl font-bold mb-6 md:text-left'>
              My Skills
            </h3>
            <div className='flex flex-wrap flex-row justify-center md:justify-start'>
              {skills.map((item, idx) => (
                <p
                  className='bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold cursor-pointer hover:bg-teal-500 hover:text-white'
                  key={idx}
                >
                  {item.skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
