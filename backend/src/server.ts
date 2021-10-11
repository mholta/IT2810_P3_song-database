
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import {resolvers} from "./models/resolvers";
import { typeDefs } from "./models/typeDefs";
require('dotenv').config();

const startServer = async () => {
    const app = express();


    const server = new ApolloServer({typeDefs, resolvers});
    
    server.applyMiddleware( {app});
    await mongoose.connect(`mongodb://${process.env.DB_IP}:${process.env.DB_PORT}`, {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME
    });
    
    app.listen({ port:4000},()=> {
        console.log(`http://localhost:4000${server.graphqlPath}`)
    })
}

startServer();

