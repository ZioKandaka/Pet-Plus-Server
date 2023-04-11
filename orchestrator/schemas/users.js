// const axios = require("axios");
// const exp = require("constants");
// const redis = require("../config/redis");
const SERVER_ONE = process.env.SERVER_ONE || "http://localhost:4001";
const SERVER_TWO = process.env.SERVER_TWO || "http://localhost:4002";

import FormData from "form-data";
import axios from "axios";
import { GraphQLError } from "graphql";

export const userTypeDefs = `
  scalar Upload

  type User {
    id: ID!
    username: String
    fullName: String
    email: String
    imgUrl: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query {
    userById(id: ID!): User
  }

  type MessageDelete {
    acknowledged: Boolean
    deletedCount: String
  }

  type MessageCreate { 
    message: String 
  }

  type token {
    access_token: String
    UserId: Int
    role: String
    username: String
  }

  type Mutation {
    register(username: String, fullName:String,  email: String, password: String, imgUrl: Upload, role: String, phoneNumber: String, address: String): MessageCreate
    putUser(UserId: ID!, username: String, fullName:String,  email: String, password: String, imgUrl: Upload, role: String, phoneNumber: String, address: String): MessageCreate
    login(email: String, password: String): token 
  }
`;

export const userResolvers = {
  Query: {
    async userById(parent, { id }) {
      try {
        // let inMemory = await redis.get("users:" + id);
        // if (inMemory) {
        //   // console.log(JSON.parse(inMemory))
        //   return JSON.parse(inMemory);
        // }
        console.log(id, "INI ID");
        let { data } = await axios({
          method: "GET",
          url: SERVER_ONE + "/user/" + id,
        });

        // await redis.set("users:" + id, JSON.stringify(data));
        console.log(data, "+_+_+_+");
        return data;
      } catch (error) {
        console.log(error.response.data);
        // return error.response.data;
        throw new GraphQLError(error.response.data.message);
      }
    },
  },
  Mutation: {
    async register(
      parent,
      {
        username,
        fullName,
        email,
        password,
        imgUrl,
        role,
        phoneNumber,
        address,
      }
    ) {
      console.log("MASUK REGISTER");
      try {
        // console.log(imgUrl.file, "INI IMAGE")
        console.log(imgUrl, "<><><>")

        const formData = new FormData();
        if (imgUrl) {
          const { createReadStream, filename, mimetype, encoding } =
            await imgUrl.file;
          const stream = createReadStream();
          formData.append("imgUrl", stream, { filename });
        }

        formData.append("username", username);
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("phoneNumber", phoneNumber);
        formData.append("address", address);

        const { data } = await axios.post(SERVER_ONE + "/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return data;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.response.data.message);
      }
    },

    async putUser(
      parent,
      {
        UserId,
        username,
        fullName,
        email,
        password,
        imgUrl,
        role,
        phoneNumber,
        address,
      }
    ) {
      try {
        let formData = new FormData();

        if (imgUrl) {
          let { createReadStream, filename, mimetype, encoding } =
            await imgUrl.file;
          let stream = createReadStream();
          formData.append("imgUrl", stream, { filename });
        }

        formData.append("username", username);
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("phoneNumber", phoneNumber);
        formData.append("address", address);

        const { data } = await axios.put(
          SERVER_ONE + "/user/" + UserId,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(data, "INI DATA")

        return data;
      } catch (error) {
        console.log(error, "INI ERROR");
        throw new GraphQLError(error.response.data.message);
      }
    },

    async login(parent, { email, password }) {
      try {
        let { data:user } = await axios({
          method: "POST",
          url: SERVER_ONE + "/login",
          data: {
            email,
            password,
          },
        });
        // console.log(user, "INI DATA");
        // redis.del("users:" + id);
        return user;
      } catch (error) {
        console.log(error.response.data);
        throw new GraphQLError(error.response.data.message);
      }
    },
  },
};

// module.exports = { userTypeDefs, userResolvers };
