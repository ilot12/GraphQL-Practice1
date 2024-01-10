import { ApolloServer, gql } from "apollo-server";

//위와 아래는 같은 의미이지만 
//type:module라는 것을 package.json에서 추가해서 위와 같이 쓸 수 있음.
//const {ApolloServer, gql} = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet!
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});