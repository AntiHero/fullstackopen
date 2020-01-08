const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server');

const mongoose = require('mongoose');

const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'MY_LIBRARY_APP';

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


const MONGODB_URI =
  'mongodb+srv://antihero:hero@zerohelp-zfjpj.mongodb.net/library?retryWrites=true&w=majority';

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book
  }  
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (global, {author, genre}) => {

      const books = await Book.find({}).populate('author');
      let result = books;

      if (author && genre) {
        return books
          .filter(book => book.author.name === author)
          .filter(book => book.genres.includes(genre) === true);
      }

      if (author) {
        if (author)
          result = books.filter(book => book.author.name === author);
      }

      if (genre) {
        if (genre)
          result = books.filter(
            book => book.genres.includes(genre) === true
          );
      }

      return result;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({}).populate('author');

      return authors.map(author => {
        let bookCount = books.filter(book => book.author.name === author.name)
          .length;

        return {
          name: author.name,
          born: author.born,
          bookCount,
        };
      });
    },
    me: (global, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (global, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let author = null;

      if (!(await Author.findOne({ name: args.author }))) {
        author = new Author({
          name: args.author,
        });

        await author.save();
      } else {
        author = await Author.findOne({ name: args.author });
      }

      const book = new Book({ ...args, author: author });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })


      return book;
    },
    editAuthor: async (global, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    addAuthor: async (global, args) => {
      const author = new Author({ ...args });

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    createUser: async (global, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre});

      if (!args.favoriteGenre) {
        user.favoriteGenre = '';
      }

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (global, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== '1234') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})