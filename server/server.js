const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const dbConnect = require("./dbConnect");
dbConnect();
const Users = require ("./model/users")
// create type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    phoneNumber: { type: GraphQLString },
    password: { type: GraphQLString },
    fullName: { type: GraphQLString }
  }
});

// create query
const query = new GraphQLObjectType({
  name: 'Root',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return Users.find();
      }
    },
    user:{
        type:UserType,
        args:{
            id: {type: GraphQLID}
        },
        resolve(parent,args){
            return Users.findById(args.id)
        }
    }
  }
});
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUsers:{
          type:UserType,
          args:{
              phoneNumber: {type: GraphQLID},
              password: {type: GraphQLID},
              fullName: {type: GraphQLID},
          },
          resolve(parent,args){
            console.log('addUsers resolver called');
            console.log('Received data:', args);
              return Users.create({fullName: args.fullName ,phoneNumber: args.phoneNumber,password:args.password})
          }
                },
        deleteUsers:{
          type:UserType,
          args:{
              id: {type: GraphQLID},
            
          },
          resolve(parent,args){
              return Users.findByIdAndDelete(args.id)
          }
                },
        updateUsers:{
          type:UserType,
          args:{
              id: {type: GraphQLID},
              fullName: {type: GraphQLID},
            
          },
          resolve(parent,args){
              return Users.findByIdAndUpdate(args.id, {$set:{fullName:args.fullName}})
          }
                }
         }
  });

const schema = new GraphQLSchema({query,mutation });
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
