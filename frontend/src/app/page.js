import Link from 'next/link';
import Footer from './components/footer';
import Navbar from './components/navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className='py-20 mb-10 h-[50vh]'
        style={{
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className='container mx-auto px-8 py-20'>
          <h1 className='text-left text-stone-50 font-semi-bold text-5xl'>
            Learn Something Awesome!
          </h1>
          <p className='text-stone-50 text-xl pt-5'>
            An educational web platform designed to teach some common web
            vulnerabilities.
          </p>
        </div>
      </div>
      <div className='mx-20 text-xl h-[29vh]'>
        Features educational articles and practical demos for four types of
        vulnerabilities:
        <ul className='list-disc list-outside pl-6 pt-3'>
          <li>SQL injection</li>
          <li>Cross-site scripting</li>
          <li>Cross-site request forgery</li>
          <li>NoSQL injection</li>
        </ul>
        <div className=''>
          <a
            className='my-8 py-3 block w-48 text-center rounded-lg bg-purple-700 hover:bg-purple-500 text-white rounded focus:outline-none focus:shadow-outline'
            href='/sqli'
          >
            Get Started!
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
