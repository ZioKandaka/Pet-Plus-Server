const SERVER_TWO = process.env.SERVER_TWO || "http://localhost:4002";
import axios from "axios";
import { GraphQLError } from "graphql";
import FormData from "form-data";

export const doctorTypeDefs = `
  scalar Upload

  type Doctor {
    id: ID!
    name: String
    imgUrl: String
    gender: String
    education: String
    PetshopId: ID
  }

 

  type Query {
    fetchDoctor(PetshopId: ID!): [Doctor]
    fetchOneDoctor(PetshopId: ID!, DoctorId: ID!): Doctor
  }

 
  type Message {
    message: String
  }

  type Mutation {
    addDoctor(name: String, imgUrl: Upload, gender:String, education: String, PetshopId: ID): Doctor
    editDoctor(name: String, imgUrl: Upload, gender:String, education: String, PetshopId: ID, DoctorId: ID): Message
    deleteDoctor(PetshopId: ID, DoctorId: ID): message
  
  }




 
`;

export const doctorResolvers = {
  Query: {
    async fetchDoctor(parent, { PetshopId }, context) {
      try {
        console.log(context, "access");
        let { data } = await axios({
          method: "GET",
          url: `${SERVER_TWO}/doctors/${PetshopId}`,
          headers : {
            access_token : context.access_token
          }
        });

        // console.log(data, "+_+_+_+");
        return data;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.response.data.message);
      }
    },
    async fetchOneDoctor(parent, { PetshopId, DoctorId }, context) {
        try {
         
          let { data } = await axios({
            method: "GET",
            url: `${SERVER_TWO}/doctors/${PetshopId}/${DoctorId}`,
            headers : {
              access_token : context.access_token
            }
          });
  
          return data;
        } catch (error) {
            // console.log(error.response.data);
            throw new GraphQLError(error.response.data.message)
        }
      },
  },
  Mutation: {
    async addDoctor(parent,{name, imgUrl, gender, education, PetshopId}, context) {
        try {
            // console.log("MASUK ADD doctor")
          // console.log(imgUrl.file, "INI IMAGE")
          const { createReadStream, filename, mimetype, encoding } = await imgUrl.file;
            // console.log(UserId, "ini id");
          const stream = createReadStream();
          const formData = new FormData();
  
          formData.append("name", name);
          formData.append("gender", gender);
          formData.append("education", education);
          formData.append("imgUrl", stream, { filename });
          const { data } = await axios({
            method: "POST",
            url: `${SERVER_TWO}/doctors/${PetshopId}`,
            data: formData,
            headers : {
              access_token : context.access_token
            }
            })
    
        //   console.log(data, "ini data");
          return data;
        } catch (error) {
        //   console.log(error);
          throw new GraphQLError(error.response.data.message)
        }
    },
    async editDoctor(parent,{name, imgUrl, gender, education, PetshopId, DoctorId}, context) {
        try {
            // console.log("MASUK editdoctor")
          // console.log(imgUrl.file, "INI IMAGE")
          const { createReadStream, filename, mimetype, encoding } = await imgUrl.file;
            // console.log(DoctorId, PetshopId, "ini id");
          const stream = createReadStream();
          const formData = new FormData();
  
          formData.append("name", name);
          formData.append("gender", gender);
          formData.append("education", education);
          formData.append("imgUrl", stream, { filename });
          const { data } = await axios({
            method: "PUT",
            url: `${SERVER_TWO}/doctors/${PetshopId}/${DoctorId}`,
            data: formData,
            headers : {
              access_token : context.access_token
            }
            })
    
        //   console.log(data, "ini data");
          return data;
        } catch (error) {
        //   console.log(error);

          throw new GraphQLError(error.response.data.message)
        }
    },
    async deleteDoctor(parent, { PetshopId, DoctorId }, context) {
        try {
          const { data } = await axios({
            method: "DELETE",
            url: `${SERVER_TWO}/doctors/${PetshopId}/${DoctorId}`,
            headers : {
              access_token : context.access_token
            }
          });
  
          return data;
        } catch (error) {
          throw new GraphQLError(error.response.data.message)

        }
      },
  },
};
