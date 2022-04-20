import { createSlice } from '@reduxjs/toolkit';

// Utils
import { post } from '../../utils';

// Elements
import swal from 'sweetalert';


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

export const postsSlice = createSlice({
    name: 'login',
    initialState: {
        posts: []
    },
    reducers: {
        fetchTweets: (state, action) => {

            fetchData()
                .then((data) => {
                    state.posts = [...data, ...state.posts];
                })
                .catch((err) => {
                    swal(
                    'No podemos cargar tu feed',
                    'Inténtalo nuevamente o ponte en contacto con los administradores del sitio :c',
                    'error'
                    );
                });
        },
        addTweet: (state, action) => {
            const tweet = action.payload;

            state.posts = [...tweet, ...state.posts];
        }
    }
});

export const {
    fetchTweets,
    addTweet
} = postsSlice.actions;

export default postsSlice.reducer;