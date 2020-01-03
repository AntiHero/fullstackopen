import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent  } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

test('renders content', () => {
  const blog = {
    author: 'Catman',
    title: 'Cats and Dogs',
    likes: 5,
  };

  const component = render(<SimpleBlog blog={blog} />);

  const header = component.container.querySelector('.header');

  const likes = component.container.querySelector('.likes');

  expect(header).toHaveTextContent(`${blog.title} ${blog.author}`);

  expect(likes).toHaveTextContent(blog.likes);
});

test('clicking the button like twice calls event handler twice', () => {
  const blog = {
    author: 'Catman',
    title: 'Cats and Dogs',
    likes: 5,
  };

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2)
})
