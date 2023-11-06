import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <div className='min-h-full'>
        <nav className='bg-gray-800'>
          <div className='mx-auto max-w-7xl px-4 sm:px-4 lg:px-6'>
            <div className='flex h-16 items-center justify-between'>
              <div className='flex items-center'>
                <Link href='/' className='text-white mr-6'>
                  Something Awesome
                </Link>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <Link
                    href='/sqli'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                  >
                    SQL Injection (SQLi)
                  </Link>
                  <a
                    href='/xss'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                  >
                    Cross-Site Scripting (XXS)
                  </a>
                  <a
                    href='/csrf'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                  >
                    Cross-Site Request Forgery (CSRF)
                  </a>
                  <a
                    href='/nosqli'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                  >
                    NoSQL Injection (NoSQLi)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
