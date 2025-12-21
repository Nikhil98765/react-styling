import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import styled from "styled-components";

import styles from "./App.module.css";
import { List } from "./components/List";
import { SearchForm } from "./components/SearchForm";
import { useStorageState } from "./hooks/useStorageState";
import { Story } from "./utils";

const title = "Hello React";
const storyEndpoint = "https://hn.algolia.com/api/v1/search?query=";

const StyledContainer = styled.div`
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

export type AppState = {
  data: Story[];
  isLoading: boolean;
  isError: boolean;
  page: number;
  nbPages: number;
};

const ACTIONS = {
  STORIES_FETCH_SUCCESS: "STORIES_FETCH_SUCCESS",
  REMOVE_STORY: "REMOVE_STORY",
  STORIES_FETCH_INIT: "STORIES_FETCH_INIT",
  STORIES_FETCH_FAILURE: "STORIES_FETCH_FAILURE",
  PAGINATION_RESET: "PAGINATION_RESET"
} as const;

export type StoriesFetchInitAction = {
  type: "STORIES_FETCH_INIT";
};
export type StoriesFetchFailureAction = {
  type: "STORIES_FETCH_FAILURE";
};

export type StoriesFetchSuccessAction = {
  type: "STORIES_FETCH_SUCCESS";
  payload: {
    data: Story[],
    page: number,
    nbPages: number
  }
};

export type RemoveStoryAction = {
  type: "REMOVE_STORY";
  payload: { objectID: string };
};

export type PaginationResetAction = {
  type: "PAGINATION_RESET";
};

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchFailureAction
  | StoriesFetchSuccessAction
  | RemoveStoryAction
  | PaginationResetAction;

export const storiesReducer = (state: AppState, action: StoriesAction) => {
  switch (action.type) {
    case ACTIONS.STORIES_FETCH_SUCCESS: {
      const payload = (action as StoriesFetchSuccessAction).payload;
      return {
        data: [...state.data, ...payload.data],
        isLoading: false,
        isError: false,
        page: payload.page,
        nbPages: payload.nbPages,
      };
    }
    case ACTIONS.REMOVE_STORY: {
      const { payload } = action as RemoveStoryAction;
      const filteredStories = state.data.filter(
        (story) => story.objectID !== payload.objectID
      );
      return {
        data: filteredStories,
        isLoading: false,
        isError: false,
        page: 0,
        nbPages: 0
      };
    }
    case ACTIONS.STORIES_FETCH_INIT:
      return {
        data: [...state.data],
        isLoading: state.data.length === 0,
        isError: false,
        page: 0,
        nbPages: 0
      };
    case ACTIONS.STORIES_FETCH_FAILURE:
    case ACTIONS.PAGINATION_RESET:
      return {
        data: [],
        isLoading: false,
        isError: true,
        page: 0,
        nbPages: 0,
      };
    default:
      throw new Error();
  }
};

export const App = () => {
  const [savedSearchTerm, setSavedSearchTerm] = useStorageState("search", "");
  const [searchTerm, setSearchTerm] = useState("React");
  const [urls, setUrls] = useState<string[]>([searchTerm]);
  const [triggerLoad, setTriggerLoad] = useState<boolean>(false);

  const [stories, storiesDispatcher] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
    page: 0,
    nbPages: 0
  });

  const handleFetchStories = useCallback(async () => {
    storiesDispatcher({
      type: ACTIONS.STORIES_FETCH_INIT,
    });

    try {      
      const results = await axios.get(`${storyEndpoint}${urls[0]}&page=${stories.page}`);
      storiesDispatcher({
        type: ACTIONS.STORIES_FETCH_SUCCESS,
        payload: {
          data: results.data.hits,
          page: results.data.page + 1,
          nbPages: results.data.nbPages
        }
      });
    } catch (error) {
      storiesDispatcher({
        type: ACTIONS.STORIES_FETCH_FAILURE,
      });
    }
  }, [urls, triggerLoad]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSavedSearchTerm(event.target.value);
  };

  const resetPagination = () => {
    storiesDispatcher({
      type: ACTIONS.PAGINATION_RESET
    })
  }

  const deleteStory = useCallback((id: string) => {
    storiesDispatcher({
      type: ACTIONS.REMOVE_STORY,
      payload: {
        objectID: id,
      },
    });
  }, []);

  return (
    <StyledContainer className={`${styles.container}`}>
      <StyledHeadlinePrimary className={`${styles.headlinePrimary}`}>
        {title}
      </StyledHeadlinePrimary>
      <SearchForm
        {...{
          storyEndpoint,
          searchTerm,
          handleSearch,
          setUrls,
          resetPagination,
        }}
      />

      <div style={{ display: "flex" }}>
        Recent Searches :
        {urls.slice(1, 6).map((searchItem, index) => (
          <span key={searchItem + index}>
            <button
              style={{
                backgroundColor: "gray",
                borderRadius: "2px",
                border: "2px",
                margin: "2px",
                padding: "2px",
              }}
              onClick={() => {
                handleSearch({
                  target: { value: searchItem },
                });
                setUrls((prevState) => {
                  const searchTermIndex = prevState.indexOf(searchItem);
                  if (searchTermIndex !== -1) {
                    prevState.splice(searchTermIndex, 1);
                  }
                  return [searchItem, ...prevState];
                });
              }}
            >
              {searchItem}
            </button>
          </span>
        ))}
      </div>

      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? <h3>Loading...</h3> : null}

      <>
        <List list={stories.data} deleteHandler={deleteStory} />
        {stories.page !== stories.nbPages && (
          <button onClick={() => setTriggerLoad((state) => !state)}>
            Load More...
          </button>
        )}
      </>
    </StyledContainer>
  );
};

export default App;
