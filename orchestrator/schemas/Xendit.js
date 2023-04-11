const SERVER_TWO = process.env.SERVER_TWO || "http://localhost:4002";
import axios from "axios";
import { GraphQLError } from "graphql";
import FormData from "form-data";

export const invoiceTypeDefs = `
  scalar Upload

 
  type Result {
    invoice : String
  }
  


  input dataInvoice {
    email: String, 
    PetshopId: ID,
    total : Int
    fullname: String
  }
  
  type Mutation {
    generateInvoice(newInvoice: dataInvoice): Result
    
  }

 
`;

export const invoiceResolvers = {
    Mutation: {
        async generateInvoice( parent, args, context) {
          try {
            // console.log(args, "test");
            const { newInvoice } = args;
            // console.log(newInvoice, "MASUK ADD Schedule pet")
            const { data } = await axios({
              method: "POST",
              url:  `${SERVER_TWO}/xendit`,
              data: newInvoice,
              headers : {
                access_token : context.access_token
              }
            });

            // console.log(data);
            return data;
          } catch (error) {
              console.log(error);
            throw new GraphQLError(error.response.data.message);
          }
        },
    },
 
};
