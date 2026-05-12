import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGOURI);
  } catch (error) {
    console.log(error);
  }
}
