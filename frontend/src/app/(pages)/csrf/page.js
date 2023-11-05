'use client';

import Navbar from '@/app/components/navbar';

const CSRFPage = () => {
  return (
    <>
      <Navbar />
      <article className='m-5'>
        <h1 className='pt-5 font-bold text-lg'>
          Cross-Site Request Forgery (CSRF)
        </h1>
        <hr className='m-3'></hr>
        <p>Cross-Site Request Forgery (CSRF)</p>
        <p>More content...</p>
      </article>
      <div className='m-5'>
        <h1 className='pt-5 font-bold text-lg'>Practice</h1>
        <hr className='m-3'></hr>
      </div>
    </>
  );
};

export default CSRFPage;
