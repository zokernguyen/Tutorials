import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import tempData from "./temp_data/index.js"

const app = express();
const httpServer = http.createServer(app);

//graphQL config

const typeDefs = `#graphQL
    type Folder {
        id: String,
        name: String,
        createdAt: String,
        author: Author
    }

    type Author {
        id: String,
        name: String
    }

    type Query {
        folders: [Folder]
    }
`;
//same keyname => auto mapping

const resolvers = {
    Query: {
        folders: () => { return tempData.folders }
    },
    //Operation Query -> folders là parent của operation Folder -> author, nó sẽ mang theo payload để operation con có thể extract được từ tham số args.
    Folder: {
        author: (parent, args) => {
            const authorId = parent.authorId;//extract dữ liệu từ parent
            return tempData.authors.find(author => author.id === authorId);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

await new Promise((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
});

console.log('🚀 Server ready at http://localhost:4000');