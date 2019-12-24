const blogs = [
  {
    title: 'Fullstack part1 exercise',
    author: 'A.Schemelev',
    url: 'url1',
    likes: 3,
  },
  {
    title: 'Fullstack part2 exercise',
    author: 'A.Schemelev',
    url: 'url2',
    likes: 5,
  },
  {
    title: 'Fullstack part3 exercise',
    author: 'A.Schemelev',
    url: 'url3',
    likes: 6,
  },
];


const setToken = () => {
  return null;
};

const getAll = async () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken };
