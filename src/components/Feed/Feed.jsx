import React, { useEffect, useState } from 'react';

import './Feed.css';
import { Post, TweetBox } from '..';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  addTweet as addTweetRedux,
  fetchTweets,
} from '../../redux/slices/postsSlice';

// Utils
import { post } from '../../utils';

// Elements
import swal from 'sweetalert';

function Feed() {
  // const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let data = await fetch(`${process.env.REACT_APP_BASE_URL}/feed`);
  //       data = await data.json();

  //       return data;
  //     } catch (err) {
  //       console.error(err);
  //       throw new Error(err);
  //     }
  //   };

  //   fetchData()
  //     .then((data) => {
  //       setPosts((posts) => [...data, ...posts]);
  //     })
  //     .catch((err) => {
  //       swal(
  //         'No podemos cargar tu feed',
  //         'Inténtalo nuevamente o ponte en contacto con los administradores del sitio :c',
  //         'error'
  //       );
  //     });
  // }, []);

  const addTweet = (tweet) => {
    try {
      post(`${process.env.REACT_APP_BASE_URL}/post`, tweet).then((newTweet) => {
        dispatch(addTweetRedux(newTweet));
      });
    } catch (err) {
      swal(
        'Algo salió mal',
        'Inténtalo nuevamente o ponte en contacto con los administradores del sitio :c',
        'error'
      );
    }
  };

  return (
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
