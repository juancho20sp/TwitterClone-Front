import React, { useState } from 'react';
import './TweetBox.css';
import { Avatar, Button } from '@material-ui/core';

// Redux
import { useSelector } from 'react-redux';

function TweetBox({ addTweet }) {
  const userAttributes = useSelector((state) => state.login.userData);
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');

  const {
    'custom:avatar': avatarUrl,
    'custom:displayName': displayName,
    'custom:username': username,
    email_verified,
  } = userAttributes;

  const sendTweet = (e) => {
    e.preventDefault();

    const tweet = {
      displayName,
      username,
      verified: email_verified === 'true' ? true : false,
      text: tweetMessage,
      image: tweetImage,
      avatar: avatarUrl,
    };

    addTweet(tweet);

    setTweetMessage('');
    setTweetImage('');
  };

  return (
    <div className='tweetBox'>
      <form>
        <div className='tweetBox__input'>
          <Avatar src={avatarUrl} />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type='text'
          />
        </div>
        <input
          onChange={(e) => setTweetImage(e.target.value)}
          value={tweetImage}
          className='tweetBox__imageInput'
          placeholder='Optional: Enter image URL'
          type='text'
        />
        <Button
          onClick={sendTweet}
          type='submit'
          className='tweetBox__tweetButton'
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
