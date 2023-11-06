const { default: Footer } = require('./footer');
const { default: Navbar } = require('./navbar');

const ArticleLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='mx-auto w-full max-w-2xl min-h-fit'>
        <article className='m-5 '>{children}</article>
      </div>
      <Footer />
    </>
  );
};

export default ArticleLayout;
