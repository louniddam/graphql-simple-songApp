import gql from 'graphql-tag'

export default gql`
query  getSong($id: ID!){
    song(id: $id){
    id
    title
    lyrics{
      content
      id
      likes
    }
  }
}
`