import user from "./user";
import root from "./root";

export default [
  root,
  user
];


// import { gql } from "apollo-server-express";
// import user from "./user";
//
// const typeDefs = gql`
//     type Query {
//         _: String # placeholder
//     }
//
//     type Mutation {
//         _: String # placeholder
//     }
// `
//
// module.exports = [
//   typeDefs,
//   user
// ]