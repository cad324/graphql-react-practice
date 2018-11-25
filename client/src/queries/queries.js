import {gql} from 'apollo-boost';

const getMinistersQuery = gql `
  {
    ministers {
      name
      title
      bio
      id
    }
  }
`
const getMinisterQuery = gql `
  query($id:ID){
    minister(id: $id) {
      name
      title
      bio
      id
    }
  }
`

export {getMinistersQuery, getMinisterQuery}
