import axios from 'axios';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App, { AppState, RemoveStoryAction, storiesReducer } from './App';
import { Story } from './utils';
import {vi} from "vitest";

vi.mock('axios');
const mockAxios = axios as vi.Mocked<typeof axios>;

const storyOne: Story = {
  title: 'React',
  url: 'https://react.dev/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: '0',
};

const storyTwo: Story = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: '1',
};

const stories = [storyOne, storyTwo];

describe('App Component', () => {
  describe("storiesReducer", () => {
    it("removes a story from all stories", () => {
      const action: RemoveStoryAction = { type: 'REMOVE_STORY', payload: { objectID: '0' } };
      const state: AppState = {
        data: stories,
        isLoading: false,
        isError: false
      };

      const expectedState = {
        data: [storyTwo],
        isLoading: false,
        isError: false
      }

      const result = storiesReducer(state, action);
      expect(result).toStrictEqual(expectedState);
    });

    // TODO: Add more test cases
  });

  describe('Data fetching', () => {
    it('should succeed fetching data', async () => {
      const promise = Promise.resolve({
        data: {
          hits: stories
        }
      });

      mockAxios.get.mockImplementationOnce(() => promise);
      render(<App />);

      expect(screen.getByText(/Loading/)).toBeInTheDocument();

      await waitFor(async () => await promise);

      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.queryByText('React')).toBeInTheDocument();
      expect(screen.queryByText(/Redux/)).toBeInTheDocument();
    })

    it('fails fetching data', async () => {
      const promise = Promise.reject();

      mockAxios.get.mockImplementationOnce(() => promise);
      render(<App />);
      expect(screen.queryByText(/Loading/)).toBeInTheDocument();

      try {
        await waitFor(async () => await promise);
      } catch (error) {
        expect(screen.queryByText(/Loading/)).toBeNull();
        expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
      }
    });

    it('removes a story', async () => {
      const promise = Promise.resolve({
        data: {
          hits: stories
        }
      });

      mockAxios.get.mockImplementationOnce(() => promise);
      render(<App />);
      await waitFor(async () => await promise);

      const dismissElements = screen.queryAllByText(/Dismiss/);
      expect(dismissElements).toHaveLength(2);
      expect(screen.queryByText(/Jordan Walke/)).toBeInTheDocument();

      fireEvent.click(dismissElements[0]);

      expect(screen.queryAllByText(/Dismiss/)).toHaveLength(1);
      expect(screen.queryByText(/Jordan Walke/)).toBeNull();
    });

    it('searches for specific story', async () => {
      // Initial render
      const reactPromise = Promise.resolve({
        data: {
          hits: stories
        }
      });

      const anotherStory = {
        title: "JavaScript",
        url: "https://en.wikipedia.org/wiki/JavaScript",
        author: "Brendan Eich",
        num_comments: 15,
        points: 10,
        objectID: 3,
      };

      const javascriptPromise = Promise.resolve({
        data: {
          hits: [anotherStory]
        }
      });

      mockAxios.get.mockImplementation((url: string) => {
        if (url.includes('React')) {
          return reactPromise
        }
        if (url.includes('JavaScript')) {
          return javascriptPromise
        }

        throw Error();
      });

      render(<App />);

      await waitFor(() => reactPromise);

      expect(screen.queryByDisplayValue(/React/)).toBeInTheDocument();
      expect(screen.queryByDisplayValue(/JavaScript/)).toBeNull();
      expect(screen.queryByText(/Jordan Walke/)).toBeInTheDocument();
      expect(screen.queryByText(/Brendan Eich/)).toBeNull();

      // Load results with search term

      fireEvent.change(screen.getByDisplayValue('React'), {
        target: {
          value: 'JavaScript'
        }
      });

      fireEvent.click(screen.getByText(/Search:/));
      await waitFor(async () => await javascriptPromise);

      expect(screen.queryByDisplayValue(/React/)).toBeNull();
      expect(screen.queryByDisplayValue(/JavaScript/)).toBeInTheDocument();
      expect(screen.queryByText(/Jordan Walke/)).toBeNull();
      expect(screen.queryByText(/Brendan Eich/)).toBeInTheDocument();
    })
  })
})

