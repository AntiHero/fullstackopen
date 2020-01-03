let _ = require('lodash');

const dummy = blogs => {
  blogs;
  return 1;
};

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, cur) => (acc + cur.likes), 0);
};

const favoriteBlog = blogs => blogs.length === 0 ? {} : blogs.sort((a, b) => a.likes - b.likes)[blogs.length - 1];

const mostBlogs = blogs => {
  if (blogs.length) {
    let tmp = _.groupBy(blogs, 'author');
    let result = [];
    Object.keys(tmp).forEach((key) => result.push({ author: key, blogs: tmp[key].length }));
    return result.sort((a, b) => a.blogs - b.blogs)[result.length - 1];
  }
  return {};
}

const mostLikes = blogs => {
  if (blogs.length) {
    let tmp = _.groupBy(blogs, 'author');
    let result = [];
    Object.keys(tmp).forEach((key) => result.push({ author: key, likes: tmp[key].reduce((acc, current) => acc + current.likes, 0) }));
    return result.sort((a, b) => a.likes - b.likes)[result.length - 1];
  }
  return {};
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
