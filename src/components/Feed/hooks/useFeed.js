import React from 'react'

// Elements
import swal from 'sweetalert';

// Redux
import { useDispatch } from 'react-redux';
import {
  setFetchedTweets,
} from '../../../redux/slices/postsSlice';

const useFeed = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
      try {
        let data = await fetch(`${process.env.REACT_APP_BASE_URL}/feed`);
        data = await data.json();
    
        return data;
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    };

  const storeFetchedData = (data) => {
    dispatch(setFetchedTweets(data));
  }

  const showErrorOnFeedLoad = () => {
    swal(
      'No podemos cargar tu feed',
      'Inténtalo nuevamente o ponte en contacto con los administradores del sitio :c',
      'error'
    );
  };

  return {
      fetchData,
      storeFetchedData,
      showErrorOnFeedLoad
  }
}

export default useFeed