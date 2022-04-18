import React, { useEffect, useState } from 'react';

import './Feed.css';
import { Post, TweetBox } from '..';

function Feed() {
  const [posts, setPosts] = useState([
    {
      avatar:
        'https://www.pngfind.com/pngs/m/7-71783_pepe-the-frog-smirk-pepe-hd-png-download.png',
      displayName: 'El Pepe',
      image: '',
      text: 'Como eeeees',
      username: 'ElPepe',
      verified: true,
    },
  ]);

  const addTweet = (tweet) => {
    setPosts((posts) => [...posts, tweet]);
  };

  return (
    <div className='feed'>
      <div className='feed__header'>
        <h2>Home</h2>
      </div>

      <TweetBox addTweet={addTweet} />

      {posts.map((post, idx) => (
        <Post
          key={idx}
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default Feed;
