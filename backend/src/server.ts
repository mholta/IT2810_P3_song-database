
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
const app = express();
const typeDefs = gql`
    type Query {
        hello: String!
    }
`;
const resolvers = {
    Query: {
        hello: () => "hei"
    }
};
const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware( {app});

app.listen({ port:4000},()=> {
    console.log(`http://localhost:4000${server.graphqlPath}`)
})
