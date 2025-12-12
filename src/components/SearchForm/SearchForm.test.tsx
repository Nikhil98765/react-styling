import { fireEvent, render, screen } from "@testing-library/react";

import { SearchForm } from "./SearchForm";

describe('Search Form component', () => {
  it('renders the component', () => {
    const searchFormProps = {
      searchTerm: 'React',
      storyEndpoint: '',
      handleSearch: vi.fn(),
      setUrl: vi.fn()
    };

    render(
      <SearchForm
        {...searchFormProps}
      />);
  });

  it('renders the input field with the value', () => {
    const searchFormProps = {
      searchTerm: "React",
      storyEndpoint: "",
      handleSearch: vi.fn(),
      setUrl: vi.fn(),
    };

    render(<SearchForm {...searchFormProps} />);


    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  })

  it('renders the correct label', () => {
    const searchFormProps = {
      searchTerm: "React",
      storyEndpoint: "",
      handleSearch: vi.fn(),
      setUrl: vi.fn(),
    };

    render(<SearchForm {...searchFormProps} />);

    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  it('should call handleSearch handler when input change event got triggered', () => {
    const searchFormProps = {
      searchTerm: "React",
      storyEndpoint: "",
      handleSearch: vi.fn(),
      setUrl: vi.fn(),
    };

    render(<SearchForm {...searchFormProps} />);

    const input = screen.getByRole("textbox");
    screen.debug();
    const spy = vitest.spyOn(searchFormProps, 'handleSearch');

    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });

    expect(spy).toHaveBeenCalledTimes(1);
  })
});