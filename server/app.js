const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.connect("mongodb://clive:test123@ds163680.mlab.com:63680/gql-books");
mongoose.connection.once('open', ()=> {
  console.log('database connected');
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
