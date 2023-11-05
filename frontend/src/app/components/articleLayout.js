const { default: Footer } = require('./footer');
const { default: Navbar } = require('./navbar');

const ArticeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='mx-auto w-full max-w-2xl'>
        <article className='m-5 '>{children}</article>
      </div>
      <Footer />
    </>
  );
};

export default ArticeLayout;
