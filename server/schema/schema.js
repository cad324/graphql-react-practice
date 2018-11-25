const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const Minister = require('../models/minister');

const {GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, {id: parent.authorID});
        return Author.findById(parent.authorID)
      }
    }
  })
});

const MinisterType = new GraphQLObjectType({
  name: 'Minister',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    title: {type: GraphQLString},
    bio: {type: GraphQLString}
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, {authorID: parent.id});
        return Book.find({authorID: parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        //code to get data from db
        // return _.find(books, {id: args.id});
        return Book.findById(args.id);
      }
    },
    minister: {
      type: MinisterType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Minister.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    ministers: {
      type: new GraphQLList(MinisterType),
      resolve(parent, args) {
        return Minister.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMinister: {
      type: MinisterType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        bio: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        let minister = new Minister({
          name: args.name,
          title: args.title,
          bio: args.bio,
          id: args.title
        });
        return minister.save();
      }
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
