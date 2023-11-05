'use client';

import { useState } from 'react';

import ArticeLayout from '@/app/components/articleLayout';
import CodeBlock from '@/app/components/codeblock';

const url = 'http://localhost:3000';

const SearchForm = () => {
  const [name, setName] = useState();
  const [results, setResults] = useState('Please search for a name!');

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(url + '/users/' + name);
    const data = await res.json();
    if (data) {
      setResults(data);
    } else {
      setResults('Looks there was an error processing your request!');
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className='py-2'>
        <input
          className='border-2 text-gray-700 text-sm my-2 p-3'
          type='text'
          name='name'
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter a name!'
        />
        <button
          className='m-2 p-3 bg-purple-700 hover:bg-purple-500 text-white rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Search
        </button>
      </form>
      <div>{JSON.stringify(results)}</div>
    </>
  );
};

const SQLiPage = () => {
  return (
    <>
      <ArticeLayout>
        <h1>SQL Injection (SQLi)</h1>
        <hr></hr>
        <h2>What is SQL Injection?</h2>
        <p>
          SQL injection (SQLi) is a web security vulnerability where malicious
          code can be placed into an SQL statement. Attackers can inject this
          malicious SQL query typically via input data from the client which is
          sent to the backend database.
        </p>
        <h2>What are the impacts of SQLi?</h2>
        <p>A successful SQL injection attack can allow an attacker:</p>
        <ul className='list-disc list-outside pl-6 pt-3'>
          <li>
            access unauthorised sensitive data from a database (such as
            passwords, credit card details, personal information...)
          </li>
          <li>
            modify the data within the database through INSERT, UPDATE and
            DELETE queries
          </li>
          <li>
            execute administration operations on the database (such as dropping
            the entire database).
          </li>
        </ul>
        <h2>How to perform an SQLi Attack?</h2>
        <p>
          Let's say we have a database that manages some students where every
          student is identified via an id (e.g. "1234567") and contains some
          data (their name, age, grade). <br />
          If our application wanted to retrieve the details of all the students
          with a certain name, we might make the following SQL query:
        </p>
        <CodeBlock lines={['SELECT * FROM students WHERE name = "Bob";']} />
        <p>
          However, if we are not careful, an attacker can modify the query to
          something like this:
        </p>
        <CodeBlock
          lines={['SELECT * FROM students WHERE name = "Bob" OR 1 = 1;']}
        />
        <p>
          The injection of the '1 = 1' clause will always evaluate to true and
          since we 'OR' this with their name, the conditional will always be
          true! So, this query instead of just returning a list of students with
          the name "Bob", it will actually return EVERY user in the database!
        </p>
        <div>
          <h2>Try it out!</h2>
          <hr className='my-3'></hr>
          <p>
            The search bar below will query a database of users with their name.
            Can you use an SQL injection attack to reveal the information of all
            the users in the database?{' '}
          </p>
          <SearchForm />
        </div>
      </ArticeLayout>
    </>
  );
};

export default SQLiPage;
