import React, { useEffect, useState } from 'react';

import './Feed.css';
import { Post, TweetBox } from '..';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  addTweet as addTweetRedux,
  setFetchedTweets,
} from '../../redux/slices/postsSlice';

// Hooks
import { useFeed } from './hooks';

// Utils
import { post } from '../../utils';

// Components
import { Loader } from '../';

function Feed() {
  const dispatch = useDispatch();
  const { fetchData, storeFetchedData, showErrorOnFeedLoad, isLoading } =
    useFeed();

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    fetchData()
      .then((data) => {
        storeFetchedData(data);
      })
      .catch((err) => {
        showErrorOnFeedLoad();
      });
  }, []);

  const addTweet = (tweet) => {
    try {
      post(`${process.env.REACT_APP_BASE_URL}/post`, tweet).then((newTweet) => {
        dispatch(addTweetRedux(newTweet));

        fetchData()
          .then((data) => {
            storeFetchedData(data);
          })
          .catch((err) => {
            showErrorOnFeedLoad();
          });
      });
    } catch (err) {
      showErrorOnFeedLoad();
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className='feed'>
      <div className='feed__header'>
        <h2>Home</h2>
      </div>

      <TweetBox addTweet={addTweet} />

      {posts.length > 0 &&
        posts.map((post, idx) => (
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
