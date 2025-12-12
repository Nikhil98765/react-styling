import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { Story } from "../utils";
import Item from "./Item";

const storyOne: Story = {
  title: "React",
  url: "https://react.dev/",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: "0",
};

const storyTwo: Story = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: "1",
};

const stories = [storyOne, storyTwo];

describe("List Component", () => {
  it('renders all properties', () => {
    render(<Item item={storyOne} deleteHandler={() => { }} />);
    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();
    expect(screen.getByText("React")).toHaveAttribute(
      "href",
      "https://react.dev/"
    );
  });

  it('renders a clickable dismiss button', () => {
    render(<Item item={storyOne} deleteHandler={() => { }} />);
    // screen.getByRole('');
    expect(screen.getByRole('button')).toBeInTheDocument();
  })

  it('should trigger dismiss button handler on click of it', () => {
    const handler = vi.fn();

    render(<Item item={storyOne} deleteHandler={handler} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledOnce();
  })
});
