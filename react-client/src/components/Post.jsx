import React from 'react';

export default (props) => {
  const { title, url, permalink, thumbnail, score, num_comments } = props.post.data;
  const redditUrl = 'http://www.reddit.com' + permalink;
  
  return (
    <div className="post-container">
        {thumbnail && thumbnail !== 'self' ? <div className="post-thumbnail-col"><img src={thumbnail} alt={thumbnail} className="post-thumbnail"/></div> : null}
        <div className="post-content-col">
          <a href={url} target="_blank" className="post-title">{title}</a>
          <span className="post-flat-list">
            <p className="post-score">Score: {score}</p>
            <p className="post-comments"><a href={redditUrl} target="_blank">{num_comments} comments</a></p>
          </span>
        </div>
    </div>
  );
};
