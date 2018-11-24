import {gql} from 'apollo-boost';

const getBookQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

const getAuthorsQuery = gql `
  {
    authors {
      name
      id
    }
  }
`

const addBookMutation = gql `
  mutation {
    addBook(name: "", genre: "", authorID: "") {
      name
      id
    }
  }
`

export {getAuthorsQuery, getBookQuery, addBookMutation}
