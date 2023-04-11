const SERVER_TWO = process.env.SERVER_TWO || "http://localhost:4002";

import FormData from "form-data";
import axios from "axios";
import { GraphQLError } from "graphql";

export const petshopTypeDefs = `
  scalar Upload

  type Petshop {
    id: ID!
    name: String
    logo: String
    address: String
    location: Location
    phoneNumber: String
    UserId: ID
  }

  type Location {
    type: String
    coordinates: [String]
  }

  type Message {
    message: String
  }

  type Doctor {
    id: ID
    name: String
    imgUrl: String
    gender: String
    education: String
  }

  type Post {
    id: ID
    title: String
    news: String
    status: String
    imageUrl: String
  }

  type Service {
    id: ID,
    name: String
    serviceLogo: String
    minPrice: Int
    maxPrice: Int
  }

  type Output {
    id: ID!
    name: String
    logo: String
    address: String
    location: Location
    phoneNumber: String
    UserId: Int
    Doctors: [Doctor]
    Services: [Service]
    Posts: [Post]
  }

  type Query {
    getAllPetshops(serviceFilter: String, nameFilter: String): [Petshop]
    getShopsAroundMe(distance: Int, lat: String, long: String): [Petshop]
    getShopById(UserId: Int): Output
  }

  type Mutation {
    postPetshop(name: String, address: String, latitude: String, longitude: String, phoneNumber: String, UserId: Int, logo: Upload): Petshop
    putPetshop(name: String, address: String, latitude: String, longitude: String, phoneNumber: String, PetshopId: Int, logo: Upload): Message
  }
`;

export const petshopResolvers = {
  Query: {
    async getAllPetshops(parent, { serviceFilter, nameFilter }, context) {
      try {
        let link = SERVER_TWO + "/petShops";
        if (serviceFilter) {
          link += "?serviceFilter=" + serviceFilter;
        }
        if (nameFilter) {
          if (serviceFilter) {
            link += "&nameFilter=" + nameFilter;
          } else {
            link += "?nameFilter=" + nameFilter;
          }
        }
        console.log(link, "<><><<>");
        let { data } = await axios({
          method: "GET",
          url: link,
        });

        console.log(data, "+_+_+_+");
        return data;
      } catch (error) {
        console.log(error.response.data);
        throw new GraphQLError(error.response.data.message);
      }
    },

    async getShopsAroundMe(parent, { distance, lat, long }, context) {
      try {
        let link =
          SERVER_TWO +
          `/petShops/around?distance=${distance}&lat=${lat}&long=${long}`;
        console.log(link);
        let { data } = await axios({
          method: "GET",
          url: link,
        });

        return data;
      } catch (error) {
        console.log(error.response.data);
        throw new GraphQLError(error.response.data.message);
      }
    },

    async getShopById(parent, { UserId }, context) {
      try {
        let { data } = await axios({
          method: "GET",
          url: SERVER_TWO + "/petShop/" + UserId,
        });
        console.log(data)
        return data;
      } catch (error) {
        console.log(error, "+_+_+_+_+_+");
        throw new GraphQLError(error.response.data.message);
      }
    },
  },
  Mutation: {
    async postPetshop(
      parent,
      { name, address, latitude, longitude, phoneNumber, UserId, logo }, context
    ) {
      console.log("MASUK post petshop");
      try {
        // console.log(imgUrl.file, "INI IMAGE")
        const formData = new FormData();

        if (logo) {
          // console.log(logo, "{}{}{}")
          const { createReadStream, filename, mimetype, encoding } =
            await logo.file;
          const stream = createReadStream();
          formData.append("logo", stream, { filename });
        }

        formData.append("name", name);
        formData.append("address", address);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("phoneNumber", phoneNumber);
        formData.append("UserId", UserId);

        const { data } = await axios.post(
          SERVER_TWO + "/petShop/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return data;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.response.data.message);
      }
    },

    async putPetshop(
      parent,
      { name, address, latitude, longitude, phoneNumber, logo, PetshopId }, context
    ) {
      //   console.log("MASUK put petshop");
      try {
        // console.log(imgUrl.file, "INI IMAGE")
        const formData = new FormData();

        if (logo) {
          const { createReadStream, filename, mimetype, encoding } =
            await logo.file;
          const stream = createReadStream();
          formData.append("logo", stream, { filename });
        }

        formData.append("name", name);
        formData.append("address", address);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("phoneNumber", phoneNumber);

        const { data } = await axios.put(
          SERVER_TWO + "/petShop/" + PetshopId,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(data)
        return data;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.response.data.message);
      }
    },
  },
};
