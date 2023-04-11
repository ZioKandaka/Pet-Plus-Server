const SERVER_TWO = process.env.SERVER_TWO || "http://localhost:4002";
const SERVER_ONE = process.env.SERVER_ONE || "http://localhost:4001";

import axios from "axios";
import { GraphQLError } from "graphql";
import FormData from "form-data";

export const petScheduleTypeDefs = `
  scalar Upload

  type PetSchedule{
    id: ID!
    complete:String
    details:String
    PetId:ID
    Pet: Pet
    DoctorScheduleId:  Int
    DoctorSchedule: DoctorSchedule
    PetshopId: Int
    Petshop : Petshop
  }


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
    User: User
  }

  type schedule{
    id: ID!
    complete:String
    details:String
    PetId:ID
    DoctorScheduleId: Int
    PetshopId: Int
  }

  input scheduleForm{
    details:String
    PetId: ID
    DoctorScheduleId: ID
    PetshopId: ID
  }


  
  
  type Message {
    message: String
  }

  type Query {
    fetchPetSchedule(PetId: ID!): [PetSchedule]
    fetchPetScheduleForPetshop(PetshopId: ID!): [PetSchedule]
  }

  type Mutation {
    addPetSchedule(newSchedule: scheduleForm): schedule
  }







 
`;

export const petScheduleResolvers = {
  Query: {
    async fetchPetSchedule(parent, { PetId }, context) {
      try {
        // console.log(PetId, "petshop id");
        let { data : petSchedule } = await axios({
          method: "GET",
          url: `${SERVER_TWO}/petSchedule/public/${PetId}`,
          headers : {
            access_token : context.access_token
          }
        });

        let schedule = petSchedule.map(async el=>{
            // console.log(el.Pet, "el>>>>");
            let { data: pet } = await axios({
            method: "GET",
            url: `${SERVER_ONE}/pet/${el.PetId}`,
            headers : {
              access_token : context.access_token
            }
            });

            el.Pet = pet

            return el
        })

        // console.log(schedule, "+_+_+_+");
        return await Promise.all(schedule) ;
      } catch (error) {
        console.log(error);
        throw new GraphQLError(error.response.data.message);
      }
    },
    async fetchPetScheduleForPetshop(parent, { PetshopId }, context) {
        try {
          // console.log(PetId, "petshop id");
          let { data : petSchedule } = await axios({
            method: "GET",
            url: `${SERVER_TWO}/petSchedule/${PetshopId}`,
            headers : {
              access_token : context.access_token
            }
          });

        //   console.log(petSchedule, ">>>>>>>>>>>");
  
          let schedule = petSchedule.map(async el=>{
            //   console.log(el.PetId, "el>>>>");
              let { data: pet } = await axios({
              method: "GET",
              url: `${SERVER_ONE}/pet/${el.PetId}`,
              headers : {
                access_token : context.access_token
              }
              });
  
              el.Pet = pet
            //   console.log(el,"<<<<<<<<<<<<<");
  
              return el
          })
  
        //   console.log(schedule, "+_+_+_+");
          let result = await Promise.all(schedule) 
        //   console.log(result,"???????????????????????????");
          return result;
        } catch (error) {
        //   console.log(error);
          throw new GraphQLError(error.response.data.message);
        }
      },
   
  },

  Mutation: {
    async addPetSchedule( parent, args, context) {
      try {
        const { newSchedule } = args;
        // console.log(newSchedule, "MASUK ADD Schedule pet")
 

        const { data } = await axios({
          method: "POST",
          url:  `${SERVER_TWO}/petSchedule/public/${newSchedule.PetId}`,
          data: newSchedule,
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
  },
 

 
};