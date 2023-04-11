const SERVER_TWO = process.env.SERVER_TWO || "http://localhost:4002";
const SERVER_ONE = process.env.SERVER_ONE || "http://localhost:4001";
import axios from "axios";
import { GraphQLError } from "graphql";

export const medicalRecordTypeDefs = `
type MedicalRecord {
    id: ID!
    notes: String
    PetId: Int
    DoctorId: Int
    PetScheduleId: Int
    PetshopId: Int
    Actions: [Action]
    Doctor: Doctor
    Petshop: Petshop
    PetSchedule: PetSchedule
}

input Create {
  notes: String
  PetId: ID!
  DoctorId: ID!
  PetScheduleId: ID!
  PetshopId: ID!
  Actions: [InputAction]
}

type Query {
    getRecord(PetId: ID!): [MedicalRecord]
}

type PetSchedule {
  id: ID
  complete: String
  details: String
  PetshopId: Int
  DoctorScheduleId: Int
}

type Action {
  id: ID
  document: String
  totalPrice: Int
  MedicalRecordId: Int
  ServiceId: Int
}
input InputAction {
  document: String
  totalPrice: Int
  ServiceId: Int
}

type Doctor {
  id: ID!
  name: String
  imgUrl: String
  gender: String
  education: String
  PetshopId: ID!
}

type Petshop {
  id: ID!
  name: String
  logo: String
  address: String
  location: Location
  phoneNumber: String
  UserId: ID
}

type outputPost {
  id: ID
  notes: String
  PetId: Int
  DoctorId: Int
  PetScheduleId: Int
  PetshopId: Int
}

type Mutation {
    postRecord(newPost: Create): outputPost
}

type message {
    message: String
}
`;

export const medicalRecordResolvers = {
  Query: {
    async getRecord(parent, { PetId }) {
      try {
        let { data } = await axios({
          method: "GET",
          url: SERVER_TWO + "/medicalRecord/" + PetId,
        });
        // console.log(data)
        return data;
      } catch (error) {
        console.log(error.response.data);
        throw new GraphQLError(error.response.data.message);
      }
    },
  },

  Mutation: {
    async postRecord(parent, { newPost }) {
      try {
        console.log(newPost, "OKOKOKOKOK")
        let { notes, PetId, DoctorId, PetScheduleId, PetshopId, Actions } =
          newPost;
        console.log(
          notes,
          PetId,
          DoctorId,
          PetScheduleId,
          PetshopId,
          Actions,
          "()()()()"
        );
        const { data: MedRec } = await axios({
          method: "POST",
          url: SERVER_TWO + "/medicalRecord",
          data: {
            notes,
            PetId,
            DoctorId,
            PetScheduleId,
            PetshopId,
          },
        });

        console.log(MedRec, "DATA");
        console.log(Actions, "Action");


        for (let i = 0; i < Actions.length; i++) {
          const { data } = await axios({
            method: "POST",
            url: SERVER_TWO + "/action/" + MedRec.id,
            data: Actions[i],
          });
        }
        
        return MedRec;
      } catch (error) {
        console.log(error.response.data);
        throw new GraphQLError(error.response.data.message);
      }
    },
  },
};
