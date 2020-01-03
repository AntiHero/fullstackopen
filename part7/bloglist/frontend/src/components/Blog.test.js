import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const testBlog = {
  author: 'Catman',
  title: 'Cats and Dogs',
  url: 'https://hatedogs.cat',
  user: { name: 'John Connor', username: 'connor' },
  likes: 5,
};

const user = {
  name: 'John Connor',
  username: 'connor',
};

test('renders content', () => {
  const component = render(<Blog blog={testBlog} />);

  const blog = component.container.querySelector('.blog');
  const expandedBlog = component.container.querySelector('.expandedBlog')

  expect(blog).toHaveTextContent(`${testBlog.title} ${testBlog.author}`);

  expect(expandedBlog).toBe(null);
});

test('clicking the button shows additional info', () => {
  const component = render(<Blog blog={testBlog} user={user} />);

  const blog = component.container.querySelector('.blog');

  fireEvent.click(blog);

  const expandedBlog = component.container.querySelector('.expandedBlog');

  expect(expandedBlog).toHaveStyle('display: block');

  expect(expandedBlog).toHaveTextContent(`${testBlog.url}`);
  expect(expandedBlog).toHaveTextContent(`${testBlog.likes}`);
});
