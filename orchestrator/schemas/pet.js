const SERVER_ONE = process.env.SERVER_ONE || "http://localhost:4001";
import { GraphQLError } from "graphql";
import FormData from "form-data";
import axios from "axios";

export const petTypeDefs = `
  scalar Upload

  type Pet {
    id: ID!
    name: String
    imgUrl: String
    gender: String
    species: String
    breed: String
    description: String
    weight: String
    UserId: ID
  }

  type onePet {
    id: ID!
    name: String
    imgUrl: String
    gender: String
    species: String
    breed: String
    description: String
    weight: String
    UserId: ID
    User : User
  }


  type Query {
    fetchPets(UserId: ID): [Pet]
    fetchPet( id: ID): onePet

  }

 
  type Message {
    message: String
  }

  type Mutation {
    addPet(name: String, imgUrl: Upload, gender:String,  species: String, breed: String, description: String, weight: String, UserId: ID): Pet
    editPet(name: String, imgUrl: Upload, gender:String,  species: String, breed: String, description: String, weight: String, UserId: ID, editId: ID): message
    deletePet(petId: ID, UserId: ID): message

  }

 
`;

export const petResolvers = {
  Query: {
    async fetchPets(parent, { UserId }, context) {
      try {
        // let inMemory = await redis.get("pets:all");
        // if (inMemory) {
        //   // console.log(JSON.parse(inMemory))
        //   return JSON.parse(inMemory);
        // }
        console.log(UserId, "INI ID")
        // console.log(context,">>>>>>>>>>>>>>>");
        let { data } = await axios({
          method: "GET",
          url: SERVER_ONE + "/pets/" + UserId,
          headers : {
            access_token : context.access_token
          }
        });

        // await redis.set("pets:all", JSON.stringify(data));
        // console.log(data, "+_+_+_+");
        return data;
      } catch (error) {
        console.log(error.response.data);
        throw new GraphQLError(error.response.data.message);
      }
    },
    async fetchPet(parent, { id }, context) {
      try {

        let { data: pet } = await axios({
          method: "GET",
          url: `${SERVER_ONE}/pet/${id}`,
          headers : {
            access_token : context.access_token
          }
        });

        // console.log(pet, "+_+_+_+");
        return pet;
      } catch (error) {
        // console.log(error.response.data);
        throw new GraphQLError(error.response.data.message);
      }
    },
  },
  Mutation: {
    async addPet(
      parent,
      { name, imgUrl, gender, species, breed, description, weight, UserId }, context
    ) {
      try {
        // console.log("MASUK ADD PET")
    
        const { createReadStream, filename, mimetype, encoding } =
          await imgUrl.file;
        // console.log(UserId, "ini id");
        const stream = createReadStream();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("species", species);
        formData.append("breed", breed);
        formData.append("description", description);
        formData.append("weight", weight);
        formData.append("imgUrl", stream, { filename });

        const { data } = await axios({
          method: "POST",
          url: `${SERVER_ONE}/pets/${UserId}`,
          data: formData,
          headers : {
            access_token : context.access_token
          }
        });
        // redis.del("pets:all")

        //   console.log(data, "ini data");
        return data;
      } catch (error) {
        //   console.log(error);
        throw new GraphQLError(error.response.data.message);
      }
    },
    async editPet(
      parent,
      {
        name,
        imgUrl,
        gender,
        species,
        breed,
        description,
        weight,
        UserId,
        editId,
      }, context
    ) {
      try {
        // console.log("MASUK edit PET")

        const { createReadStream, filename, mimetype, encoding } =
          await imgUrl.file;

        // console.log(UserId, "ini id");
        const stream = createReadStream();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("gender", gender);
        formData.append("species", species);
        formData.append("breed", breed);
        formData.append("description", description);
        formData.append("weight", weight);
        formData.append("imgUrl", stream, { filename });

        const { data } = await axios({
          method: "PUT",
          url: `${SERVER_ONE}/pets/${UserId}/${editId}`,
          data: formData,
          headers : {
            access_token : context.access_token
          }
        });

        //   console.log(data, "ini data");
        // redis.del("users:all")
        return data;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.response.data.message);
      }
    },
    async deletePet(parent, { petId, UserId }, context) {
      try {
        const { data } = await axios({
          method: "DELETE",
          url: `${SERVER_ONE}/pets/${UserId}/${petId}`,
          headers : {
            access_token : context.access_token
          }
        });

        return data;
      } catch (error) {
        return error.response.data;
        throw new GraphQLError(error.response.data.message)

      }
    },
  },
};

// module.exports = { userTypeDefs, userResolvers };
