const axios = require("axios");
const redis = require ("./config/redis");
// let url = "user-service"
let url = "localhost"


const petTypeDefs =`#graphql

    type Pet {
        id: Int
        name: String
        imgUrl: String
        gender: String
        species: String
        breed: String
        description: String
        weight: String
        owner: owner

    }

    type owner {
        id: Int
        username: String
        fullName: String
        email: String
        phoneNumber: String
        address: String
        role: String
    }

    type Query {
        fetchPets (UserId: ID): [Pet]
      
    }

    type Message {
        message: String
    }


`


const petResolvers= {
    Query: {
       
        fetchPets: async (parent, args) => {
            try {
                const { UserId } = args;
                let redisData = await redis.get(`pets:all`);
                if (redisData) {
                    return JSON.parse(redisData);
                }
                const { data } = await axios.get(
                    `http://${url}:4001/pets/${UserId}`
                );
                console.log(data);
                await redis.set(`pets:all`, JSON.stringify(data));
                return data;
            } catch (error) {
                console.log(error.response.data);
                return error.response.data.message;

            }
        },
    },
    
}

module.exports= {
    petResolvers, petTypeDefs
}