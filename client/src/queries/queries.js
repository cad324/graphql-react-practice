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
  mutation($name: String!, $genre: String!, $authorID: ID!) {
    addBook(name: $name, genre: $genre, authorID: $authorID) {
      name
      id
    }
  }
`

const getSingleBookQuery = gql `
  query($id: ID) {
    book(id: $id) {
      name
      genre
      id
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`

export {getAuthorsQuery, getBookQuery, addBookMutation, getSingleBookQuery}
