import React from 'react';
import Post from './Post.jsx';

export default (props) => {
  const { name } = props.subreddit;
  const { children } = props.subreddit.data;

  return (
    <div className="subreddit">
     <div className="subreddit-name">{name}</div>

      <div>
        {children.slice(0, 7).map((post, index) => {
          return <Post key={index} post={post} />
        })}
      </div>

      <span onClick={() => props.handleDeleteSubreddit(name)} className="delete-btn">Delete</span>
    </div>
  );
};
