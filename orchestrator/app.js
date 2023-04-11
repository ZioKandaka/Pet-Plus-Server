// const { ApolloServer } = require("@apollo/server")
// // const fastify = require("fastify")()
// const { startStandaloneServer } = require("@apollo/server/standalone");
// const { userTypeDefs, userResolvers } = require("./schemas/users");
// import name from 'module';

import { ApolloServer } from "apollo-server-express";
import express from "express";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { userTypeDefs, userResolvers } from "./schemas/users.js";
import {
  doctorScheduleResolvers,
  doctorScheduleTypeDefs,
} from "./schemas/DoctorSchedule.js";
import { petResolvers, petTypeDefs } from "./schemas/pet.js";
import {
  medicalRecordResolvers,
  medicalRecordTypeDefs,
} from "./schemas/MedicalRecord.js";
import { doctorResolvers, doctorTypeDefs } from "./schemas/Doctor.js";
import { postResolvers, postTypeDefs } from "./schemas/Post.js";
import { serviceResolvers, serviceTypeDefs } from "./schemas/Service.js";
import { petScheduleResolvers, petScheduleTypeDefs } from "./schemas/petSchedule.js";
import { invoiceResolvers, invoiceTypeDefs } from "./schemas/Xendit.js";
import { petshopResolvers, petshopTypeDefs } from "./schemas/Petshop.js";

const app = express();

const server = new ApolloServer({
  typeDefs: [userTypeDefs, doctorScheduleTypeDefs, petTypeDefs, medicalRecordTypeDefs, doctorTypeDefs, postTypeDefs, serviceTypeDefs, petScheduleTypeDefs, invoiceTypeDefs, petshopTypeDefs ],
  resolvers: [userResolvers, doctorScheduleResolvers, petResolvers, medicalRecordResolvers,  doctorResolvers, postResolvers, serviceResolvers, petScheduleResolvers, invoiceResolvers, petshopResolvers ],
 
  uploads: false, // Disable the built-in file handling of Apollo Server
  context : ({req})=>{
    // console.log(req.headers.access_token,">>>>>>>");
    return {access_token: req.headers.access_token}
  }
});

async function startApolloServer() {
  await server.start();
  // console.log(server.," >>>>>>>>>>");

  // Add the graphqlUploadExpress middleware
  app.use(graphqlUploadExpress());

  // Apply the Apollo Server middleware to the Express app
  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
