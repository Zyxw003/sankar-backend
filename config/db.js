import mongoose from "mongoose";

export const Connectdb = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log("Mangodb connected with server :", data.connection.host);
  });
};
