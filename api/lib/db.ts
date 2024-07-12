import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");

    return;
  }
  if (connectionState === 2) {
    console.log("Reconnecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "next14restapi",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log("Error", error);
    throw new Error("Failed to connect", error);
  }
};
export default connect;
