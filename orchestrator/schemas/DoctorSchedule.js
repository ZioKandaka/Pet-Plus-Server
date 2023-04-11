const SERVER_TWO = process.env.SERVER_TWO || "http://localhost:4002";
import axios from "axios";
import { GraphQLError } from "graphql";

export const doctorScheduleTypeDefs = `
type DoctorSchedule {
    id: ID!
    day: String
    time: String
    status: String
    PetshopId: Int
    DoctorId: Int
}

type Query {
    getDocSched(DoctorId: ID!, PetshopId: ID!): [DoctorSchedule]
}

type Mutation {
    postDocSched(day: String, time: String, status: String, DoctorId: ID!, PetshopId: ID!): DoctorSchedule
    putDocSched(DoctorScheduleId: ID!, day: String, time: String, status: String): message
    deleteDocSched(DoctorScheduleId: ID!): message
}

type message {
    message: String
}
`;

export const doctorScheduleResolvers = {
  Query: {
    async getDocSched(parent, { DoctorId, PetshopId }) {
      //   console.log(SERVER_TWO + "/doctorSchedule/" + DoctorId + "/" + PetshopId);
      try {
        // console.log(DoctorId, PetshopId, "ini data");

        let { data } = await axios({
          method: "GET",
          url: SERVER_TWO + "/doctorSchedule/" + DoctorId + "/" + PetshopId,
        });
        // console.log(data)
        return data;
      } catch (error) {
        console.log(error.response.data);
        throw new GraphQLError(error.response.data.message)
      }
    },
  },

  Mutation: {
    async postDocSched(parent, { day, time, status, DoctorId, PetshopId }) {
      try {
        const { data } = await axios({
          method: "POST",
          url: SERVER_TWO + "/doctorSchedule/" + DoctorId + "/" + PetshopId,
          data: {
            day,
            time,
            status,
            DoctorId,
            PetshopId,
          },
        });

        return data;
      } catch (error) {
        console.log(error.response.data)
        throw new GraphQLError(error.response.data.message)
      }
    },

    async putDocSched(
      parent,
      { DoctorScheduleId, day, time, status, DoctorId, PetshopId }
    ) {
      try {
        const { data } = await axios({
          method: "PUT",
          url: SERVER_TWO + "/doctorSchedule/" + DoctorScheduleId,
          data: {
            day,
            time,
            status,
            DoctorId,
            PetshopId,
          },
        });

        return data;
      } catch (error) {
        console.log(error.response.data)
        throw new GraphQLError(error.response.data.message)
      }
    },

    async deleteDocSched(parent, { DoctorScheduleId }) {
      try {
        console.log(DoctorScheduleId, "IDIDID");
        const { data } = await axios({
          method: "DELETE",
          url: SERVER_TWO + "/doctorSchedule/" + DoctorScheduleId,
        });

        return data;
      } catch (error) {
        console.log(error.response.data)
        throw new GraphQLError(error.response.data.message)
      }
    },
  },
};
