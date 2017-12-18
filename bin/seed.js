require("dotenv").config();
require("../config/mongoose-setup");

const User = require("../models/user-model");


const user =[
   {
      placeName: "Miami Soccer Field",
      email: "miami@fields.com",
      encryptedPassword: "Chu.0610",
      phone: "(786)-393-9364",
      location: "500 Brickell Avenue, Miami, FL 33131",
      fields: 4
   }
 ];

User.create(user)
  .then((results) => {
    console.log(`${results.length} user created`);
  })
  .catch((err) => {
    console.log("Save ERROR!");
    console.log(err);
  });
