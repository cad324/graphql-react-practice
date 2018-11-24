const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect("mongodb://cabinet:cabinet123@ds147361.mlab.com:47361/jamaican-cabinet");
mongoose.connection.once('open', ()=> {
  console.log('Cabinet database connected');
});

//allow cross-origin requests
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
