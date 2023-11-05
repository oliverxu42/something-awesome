import { useRef, useState } from 'react';

const COMMENTS = [
  {
    author: 'Alice',
    content: 'Wow, this is an amazing blog!',
    date: new Date(2022, 11, 25).toDateString(),
  },
  {
    author: 'Bob',
    content: 'Cool bananas!',
    date: new Date(2002, 1, 8).toDateString(),
  },
];

const CommentCard = ({ comment }) => {
  return (
    <div className='w-full mt-3 lg:max-w-full lg:flex'>
      <div className='border-t border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
        <div className='flex items-center'>
          <div className='text-sm'>
            <p className='text-gray-900 leading-none font-bold'>
              {comment.author}
            </p>
            <p className='text-gray-600'>{comment.date}</p>
          </div>
        </div>
        <div className='mt-8'>
          <p className='text-gray-700 text-base'>{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const commentRef = useRef(null);

  const comments = [...COMMENTS];
  const [comment, setComment] = useState();

  const handleComment = async (e) => {
    e.preventDefault();

    const newComment = {
      author: 'Me',
      content: comment,
      date: new Date().toDateString(),
    };

    const newCard = ` <div class='w-full mt-3 lg:max-w-full lg:flex'>
    <div class='border-t border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
      <div class='flex items-center'>
        <div class='text-sm'>
          <p class='text-gray-900 leading-none font-bold'>
            ${newComment.author}
          </p>
          <p class='text-gray-600'>${newComment.date}</p>
        </div>
      </div>
      <div class='mt-8'>
        <p class='text-gray-700 text-base'>${newComment.content}</p>
      </div>
    </div>
  </div>`;

    // Here is the XSS vulnerable code!!!
    const dom = new DOMParser().parseFromString(newCard, 'text/html').body
      .firstElementChild;
    commentRef.current.appendChild(dom);
  };
  return (
    <>
      <h1>Very Secure Blog</h1>
      <h2>Comments</h2>
      <div className='border' ref={commentRef}>
        {comments.map((c, i) => {
          return <CommentCard key={i} comment={c} />;
        })}
      </div>
      <div>
        <form onSubmit={handleComment} className='p-2'>
          <textarea
            rows='4'
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Leave a comment...'
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            className='mt-3 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Post Comment
          </button>
        </form>
      </div>
    </>
  );
};

export default Blog;
