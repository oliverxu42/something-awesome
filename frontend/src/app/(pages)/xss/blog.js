import { useRef, useState } from 'react';

const COMMENTS = [
  {
    author: 'Alice',
    content: 'Wow, this is an amazing blog!',
    date: new Date(2002, 1, 8).toDateString(),
  },
  {
    author: 'Bob',
    content: 'Cool bananas!',
    date: new Date(2022, 11, 25).toDateString(),
  },
];

const CommentCard = ({ comment }) => {
  return (
    <div className='w-full mt-3 '>
      <div className='border-t border-gray-400  bg-white rounded-b  p-4 flex flex-col justify-between '>
        <div className='flex items-center'>
          <div className='text-sm'>
            <p className='text-gray-900 font-bold'>{comment.author}</p>
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

    const newCard = ` <div class='w-full mt-3'>
    <div class='border-t border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal'>
      <div class='flex items-center'>
        <div class='text-sm'>
          <p class='text-gray-900 font-bold '>
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
      <h2 className='text-center font-serif'>Very Secure Blog</h2>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
      <h2 className='text-center font-serif'>Comments</h2>
      <div className='' ref={commentRef}>
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
            required
          ></textarea>

          <button
            className='mt-3 right-0 p-2 bg-purple-700 hover:bg-purple-500 text-white rounded focus:outline-none focus:shadow-outline'
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
