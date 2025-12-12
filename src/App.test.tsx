import { AppState, RemoveStoryAction, storiesReducer } from './App';
import { Story } from './utils';

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
})

