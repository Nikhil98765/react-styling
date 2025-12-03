import { useCallback, useEffect, useReducer, useState } from 'react';
import axios from 'axios';

import './App.css'
import { Dnd } from './components/Dnd';
import {InputWithLabel} from './components/InputWithLabel';
import { List } from './components/List';
import { Search } from './components/Search';
import { SearchForm } from './components/SearchForm';
import { LoginFormUncontrolled } from './components/LoginFormUncontrolled';
import { LoginFormControlled } from './components/LoginFormControlled';
// import { useStorageState } from './hooks/useStorageState';

const title = "Hello React";
const storyEndpoint = "https://hn.algolia.com/api/v1/search?query=";
// const debounceValue = 600;
// const list = [
//   {
//     title: "React",
//     url: "https://react.dev/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: "Angular",
//     url: "https://redux.js.org/",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ];

export const App = () => {

  // const [searchTerm, setSearchTerm] = useStorageState('search', 'react');
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState(`${storyEndpoint}${searchTerm}`);
  // const [stories, setStories] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // let timer = useRef(null);

  const ACTIONS = {
    STORIES_FETCH_SUCCESS: "STORIES_FETCH_SUCCESS",
    REMOVE_STORY: "REMOVE_STORY",
    STORIES_FETCH_INIT: "STORIES_FETCH_INIT",
    STORIES_FETCH_FAILURE: "STORIES_FETCH_FAILURE"
  };

  const storiesReducer = (state, {type, payload}) => {
    switch (type) {
      case ACTIONS.STORIES_FETCH_SUCCESS:
        return {
          data: payload,
          isLoading: false,
          isError: false,
        };
      case ACTIONS.REMOVE_STORY: {
        const filteredStories = state.filter((story) => story.objectID !== payload.objectID);
        return {
          data: filteredStories,
          isLoading: false,
          isError: false,
        }
      }
      case ACTIONS.STORIES_FETCH_INIT:
        return {
          data: [],
          isLoading: true,
          isError: false,
        };
      case ACTIONS.STORIES_FETCH_FAILURE:
        return {
          data: [],
          isLoading: false,
          isError: true,
        }
      default:
        throw new Error();
    }
  }

  const [stories, storiesDispatcher] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false
  });

  // const getAsyncStories = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // resolve(list);
  //       reject();
  //     }, 2000);
  //   })
  // }

  const handleFetchStories = useCallback(async () => {
    // setIsLoading(true);
    storiesDispatcher({
      type: ACTIONS.STORIES_FETCH_INIT,
    });

    // timer.current = setTimeout(() => {
    try {
      const results = await axios.get(url);
      storiesDispatcher({
        type: ACTIONS.STORIES_FETCH_SUCCESS,
        payload: results.data.hits,
      });
    } catch (error) {
      storiesDispatcher({
            type: ACTIONS.STORIES_FETCH_FAILURE,
      });
    }

      // .then(
      //   (results) => {
      //     // setStories(results);
      //     storiesDispatcher({
      //       type: ACTIONS.STORIES_FETCH_SUCCESS,
      //       payload: results.data.hits,
      //     });
      //   },
      //   () => {
      //     storiesDispatcher({
      //       type: ACTIONS.STORIES_FETCH_FAILURE,
      //     });
      //   }
      // );
    // }, debounceValue);

    // return () => {
    //   clearTimeout(timer.current);
    // };
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  function handleSearch(event) {
      setSearchTerm(event.target.value);
    // Side effect, we can handle the side effects using useEffect
    // localStorage.setItem("searchTerm", event.target.value);
  }


  const deleteStory = (id) => {
    // setStories(stories.filter((story) => story.objectID !== id));
    storiesDispatcher({
      type: ACTIONS.REMOVE_STORY,
      payload: {
        objectID: id,
      },
    });
  }

  // const searchedStories = stories.data.filter(story => story.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <h1>{title}</h1>
      <SearchForm {...{ storyEndpoint, searchTerm, handleSearch, setUrl }} />
      <br />
      <br />
      {/* <InputWithLabel id="input-with-label" label="Search : " /> */}

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <List list={stories.data} deleteHandler={deleteStory} />
      )}

      {/* <Dnd /> */}

      {/* <LoginFormUncontrolled /> */}
      <LoginFormControlled></LoginFormControlled>
    </>
  );
}

export default App
