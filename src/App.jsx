import { useCallback, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import styles from './App.module.css';
import { List } from './components/List';
import { SearchForm } from './components/SearchForm';
import { LoginFormControlled } from './components/LoginFormControlled';

const title = "Hello React";
const storyEndpoint = "https://hn.algolia.com/api/v1/search?query=";
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

  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState(`${storyEndpoint}${searchTerm}`);

  const StyledContainer = styled.div`
    height: 100vw;
    padding: 20px;
    background: #83a4d4;
    background: linear-gradient(to left, #b6fbff, #83a4d4);
    color: #171212;
  `;

  const StyledHeadlinePrimary = styled.h1`
    font-size: 48px;
    font-weight: 300;
    letter-spacing: 2px;
  `;


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

  const handleFetchStories = useCallback(async () => {
    storiesDispatcher({
      type: ACTIONS.STORIES_FETCH_INIT,
    });

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
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  function handleSearch(event) {
      setSearchTerm(event.target.value);
  }


  const deleteStory = (id) => {
    storiesDispatcher({
      type: ACTIONS.REMOVE_STORY,
      payload: {
        objectID: id,
      },
    });
  }


  return (
    <StyledContainer className={`${styles.container}`}>
      <StyledHeadlinePrimary className={`${styles.headlinePrimary}`}>{title}</StyledHeadlinePrimary>
      <SearchForm {...{ storyEndpoint, searchTerm, handleSearch, setUrl }} />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <List list={stories.data} deleteHandler={deleteStory} />
      )}
      <LoginFormControlled></LoginFormControlled>
    </StyledContainer>
  );
}

export default App
