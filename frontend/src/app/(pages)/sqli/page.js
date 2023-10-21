'use client';

import Navbar from '@/app/components/navbar';
import { useState } from 'react';

const url = 'http://localhost:3000';

const SearchForm = () => {
  const [name, setName] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(name);
    const res = await fetch(`${url}/users/${name}`);
    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSearch} className='p-2'>
      <input
        className='border-2 text-gray-700 text-sm font-bold mb-2'
        type='text'
        name='name'
        onChange={(e) => setName(e.target.value)}
        placeholder='name'
      />
      <button
        className='m-2 p-1 bg-blue-500 hover:bg-blue-700 text-white rounded focus:outline-none focus:shadow-outline'
        type='submit'
      >
        Search
      </button>
    </form>
  );
};

const SQLiPage = () => {
  return (
    <>
      <Navbar />
      <article className='m-5'>
        <h1 className='pt-5 font-bold text-lg'>SQL Injection</h1>
        <hr className='m-3'></hr>
        <p>
          SQL injection (SQLi) is a web security vulnerability where malicious
          code can be placed into an SQL statement.
        </p>
        <p>More content...</p>
      </article>
      <div className='m-5'>
        <h1 className='pt-5 font-bold text-lg'>Quiz</h1>
        <hr className='m-3'></hr>
        <p>
          Which of the following payload will return all the users from the
          database?
        </p>
        <ul className='m-3'>
          <li>a. x" OR 1 = 1; --test</li>
          <li>b. x" AND 1 = 1; --test</li>
          <li>c. SELECT * FROM users</li>
        </ul>
      </div>
      <div className='m-5'>
        <h1 className='pt-5 font-bold text-lg'>Practice Wargame</h1>
        <hr className='m-3'></hr>
        <p>Find the flag using an SQL injection attack.</p>
        <SearchForm />
      </div>
    </>
  );
};

export default SQLiPage;
