const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import LibTask from './lib/LibTask'
//import LibUser from './lib/LibUser'
//import LibNote from './lib/LibNote'
import scheme from './scheme'

interface IArgs {
  id: number,
  title: string,
}
//
const typeDefs = scheme.getTypeDefs();
/* resolvers */
const resolvers = {
  Query: {
    hello: () => 'Hello world-11',
    async task(parent: any, args: IArgs, context: any, info: any){
      return await LibTask.getTask(args.id);
    },
    tasks:async () => {
      return await LibTask.getItems();
    },
  },
  Mutation: {
    addTask: async (parent: any, args: IArgs, context: any) => {
      const ret = await LibTask.addTask(args)
      return ret
    },
    updateTask: async (parent: any, args: IArgs, context: any) => {
      const ret = await LibTask.updateTask(args)
      return ret
    },
    deleteTask: async (parent: any, args: IArgs, context: any) => {
      const ret = await LibTask.deleteTask(args)
      return ret
    },    
  }
};
/* serever-Start */
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
// ENV
//console.log(app.get('env'));
app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
