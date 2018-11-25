const graphql = require('graphql');
const _ = require('lodash');
const Minister = require('../models/minister');

const {GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull} = graphql;

const MinisterType = new GraphQLObjectType({
  name: 'Minister',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    title: {type: GraphQLString},
    bio: {type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    minister: {
      type: MinisterType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Minister.findById(args.id);
      }
    },
    ministers: {
      type: new GraphQLList(MinisterType),
      resolve(parent, args) {
        return Minister.find({});
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
          bio: args.bio
        });
        return minister.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
