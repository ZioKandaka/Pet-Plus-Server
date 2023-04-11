var FormData = require("form-data");
const axios = require('axios');

async function ImageCloud(input) {
  const form = new FormData();
  form.append("file", input.buffer, { filename: input.originalname });
  form.append("fileName", input.originalname);
  //   console.log(input, "MASUKKK")

  const PK = process.env.PK

  const { data } = await axios({
    method: "POST",
    url: "https://upload.imagekit.io/api/v1/files/upload",
    data: form,
    headers: {
      Authorization: "Basic " + PK,
    },
  });

  return data
}

module.exports = ImageCloud
