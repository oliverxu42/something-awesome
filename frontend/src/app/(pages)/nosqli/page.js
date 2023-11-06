'use client';

import { useState } from 'react';

import ArticleLayout from '@/app/components/articleLayout';
import CodeBlock from '@/app/components/codeblock';

const url = 'http://localhost:3000';

const SearchForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [results, setResults] = useState('Please login!');

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(url + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      if (data) {
        setResults("Looks like you've logged in!" + JSON.stringify(data));
      }
    } else if (res.status === 403) {
      setResults('Incorrect email or password!');
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
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          className='border-2 text-gray-700 text-sm my-2 p-3'
          type='password'
          name='name'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button
          className='m-2 p-3 bg-purple-700 hover:bg-purple-500 text-white rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Login
        </button>
      </form>
      <div>{JSON.stringify(results)}</div>
    </>
  );
};

const NoSQLiPage = () => {
  return (
    <>
      <ArticleLayout>
        <h1>NoSQL Injection (NoSQLi)</h1>
        <hr></hr>
        <h2>What is NoSQL Injection?</h2>
        <p>
          NoSQL injection (NoSQLi) is a vulnerability where malicious code can
          be injected and executed by NoSQL databases such as MongoDB, CouchDB
          and more. These attacks are similar to the traditional SQL injection
          attacks, but since NoSQL database don't rely on a common query
          language a malicious payload will affect only one type of database.
        </p>
        <h2>NoSQL Injection in MongoDB</h2>
        <p>
          MongoDB is a popular NoSQL database - here's how someone might perform
          an injection attack. <br /> A query to find and authenticate a user
          from the database might look something like this:
        </p>
        <CodeBlock
          lines={[
            `db.collection('users').find({"username": req.query.username, "password": req.query.password})`,
          ]}
        />
        <p>
          The username and password fields would have been inputted through a
          form before being sent as an HTTP request to the endpoint above. But
          what if a user maliciously inputted the following password?
        </p>
        <CodeBlock lines={[`{ password: { $ne: 1 } }`]} />
        <p>
          The $ne operator in MongoDB means not equal, so the query will find
          all users where the password is not equal to '1', allowing the
          attacker to bypass authentication and gain unauthorised access to your
          application!
        </p>
        <br></br>
        <p>
          An attacker can also exploit the $where operator to inject and execute
          Javascript. If we had a query that looked like this:
        </p>
        <CodeBlock
          lines={[
            `db.collection.find({ $where: function() { 
    return (this.username == 'foo'; sleep(5000))}})`,
          ]}
        />
        <p>
          If the injection was successful, this code would be executed by the
          server and cause it to pause for 5 seconds.
        </p>

        <h2>Try it out!</h2>
        <hr className='my-3'></hr>
        <p>See if you can by-pass authentication with a NoSQLi attack!</p>
        <SearchForm />
      </ArticleLayout>
    </>
  );
};
export default NoSQLiPage;
