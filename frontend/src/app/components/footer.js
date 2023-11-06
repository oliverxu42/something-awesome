const Footer = () => {
  return (
    <footer className='bg-gray-100 h-30 mt-12 dark:bg-gray-800'>
      <div className='w-full h-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          Created by Oliver Xu (z5310488) for COMP6841: Extended Cyber Security
          Engineering, 23T3
        </span>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <li>
            <a
              href='https://github.com/oliverxu42/something-awesome'
              className='mr-4 hover:underline md:mr-6 '
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
