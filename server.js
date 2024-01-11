import { ApolloServer, gql } from "apollo-server";

//위와 아래는 같은 의미이지만 
//type:module라는 것을 package.json에서 추가해서 위와 같이 쓸 수 있음.
//const {ApolloServer, gql} = require("apollo-server");

let tweets = [
  {
    id: "1",
    text: "first one",
    userId: "1",
  },
  {
    id: "2",
    text: "second one",
    userId: "2",
  }
];

let users = [
  {
    id: "1",
    firstName: "Kim",
    lastName: "DongJu",
  },
  {
    id: "2",
    firstName: "Lee",
    lastName: "Dongin",
  }
]

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User!
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
` 

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      console.log("allUsers() 호출됨.");
      return users;
    }
  },
  Mutation: {
    postTweet(root, {text, userId}) {
      const newTweet = {
        id: tweets.length + 1,
        text,
        userId,
      }
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(root, { id }) {
      const tweet = tweets.find(tweet => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter(tweet => tweet.id !== id);
      return true;
    }
  },
  User: {
    fullName({firstName, lastName}) {
      return `${firstName} ${lastName}`;
    }
  },
  Tweet: {
    author({userId}) {
      return users.find(user => user.id === userId);
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});