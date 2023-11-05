'use client';

import Navbar from '@/app/components/navbar';
import Blog from './blog';
import ArticeLayout from '@/app/components/articleLayout';
import CodeBlock from '@/app/components/codeblock';

const XSSPage = () => {
  return (
    <>
      <ArticeLayout>
        <h1>Cross-Site Scripting (XSS)</h1>
        <hr className='m-3'></hr>
        <h2>What is Cross-Site Scripting?</h2>
        <p>
          Cross-site scripting (XSS) is web security vulnerability where an
          attacker can inject malicious scripts into a vulnerable application.
          XSS works by manipulating a website so that it can execute malicious
          javascript to an unsuspecting user.
        </p>
        <br />
        <p>There are three main types of XXS attacks:</p>
        <ul className='list-disc list-outside pl-6 pt-3'>
          <li>Reflected XSS</li>
          <li>Stored XSS</li>
          <li>DOM-Based XSS</li>
        </ul>
        <h2>Reflected XSS</h2>
        <p>
          Reflected cross-site scripting occurs in an application when a
          malicious script is "reflected" off the web server, e.g. through a
          search query:
        </p>
        <CodeBlock
          lines={[
            'https://insecure.website.com/blogs?u=plane',
            '<p>User is Plane<p>',
          ]}
        />
        <p>
          An attacker can inject malicious javascript within the query
          parameter:
        </p>
        <CodeBlock
          lines={[
            `https://insecure.website.com/blogs?u=<script>alert("You've been hacked!)"</script>`,
            `<p>User is <script>alert("You've been hacked!)"</script><p>`,
          ]}
        />
        <p>
          Reflected XSS attacks are usually conducted through 3rd-party methods,
          such as through a malicious link in an e-mail or some sussy website.
          When a user clicks on the malicious link, the injected code travels to
          the vulnerable website, which then gets "reflected" back to the user’s
          browser. The browser then executes the code because it appeared to
          come from a “trusted” site.
        </p>
        <h2>Stored XSS</h2>
        <p>
          Stored cross-site scripting occurs when the injected script is
          permanently stored on the web server, e.g. in a database. The malicous
          script gets executed when the victim retrieves the data from the
          untrusted server.
        </p>
        <h2>DOM-Based XSS</h2>
        <p>
          DOM-based cross-site scripting occurs in applications that contain
          vulnerable client-side Javascript.
        </p>
        <CodeBlock
          lines={[
            `const blogs = document.getElementById('blogs');`,
            `blogs.innerHTML = 'blogs...';`,
          ]}
        />
        <p>
          Using innerHTML is vulnerable as it can be used to execute malicious
          scripts:
        </p>
        <CodeBlock
          lines={[
            `const blogs = document.getElementById('blogs');`,
            `blogs.innerHTML = <script>alert("You've been hacked!)"</script>";`,
          ]}
        />
        <div>
          <h2>Try it out!</h2>
          <hr className='m-3'></hr>
          <Blog />
        </div>
      </ArticeLayout>
    </>
  );
};

export default XSSPage;
