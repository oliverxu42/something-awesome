'use client';

import Navbar from '@/app/components/navbar';
import Blog from './blog';
import ArticeLayout from '@/app/components/articleLayout';

const XSSPage = () => {
  return (
    <>
      <ArticeLayout>
        <h1>Cross Site Scripting (XSS)</h1>
        <hr className='m-3'></hr>
        <p>Cross Site Scripting (XSS)</p>
        <p>More content...</p>

        <div className='m-5'>
          <h1 className='pt-5 font-bold text-lg'>Practice</h1>
          <hr className='m-3'></hr>
          <Blog />
        </div>
      </ArticeLayout>
    </>
  );
};

export default XSSPage;
