import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('login'));

    const loginForm = component.container.querySelector('.loginForm');
    const blogs = Array.from(component.container.querySelectorAll('.blogs'));

    expect(component.container.contains(loginForm)).toBe(true);
    expect(blogs).toEqual([]);
  });

  test('if user is logged, blogs are rendered', async () => {
    const user = {
      token: '12345',
      username: 'maurisio',
      name: 'Maurisio Rua',
    };

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('new blog'));

    const loginForm = component.container.querySelector('.loginForm');

    expect(loginForm).toBe(null);
    expect(component.container).toHaveTextContent('Fullstack part1 exercise');
    expect(component.container).toHaveTextContent('Fullstack part2 exercise');
    expect(component.container).toHaveTextContent('Fullstack part3 exercise');
  });
});
