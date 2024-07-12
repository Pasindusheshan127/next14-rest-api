import connect from "@/lib/db";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;

// get user
export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (e: any) {
    return new NextResponse("Error in fetching user" + e.massage, {
      status: 500,
    });
  }
};

//create user
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ massage: "user is created", user: newUser }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating user" + error.massage, {
      status: 500,
    });
  }
};

//update user
export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;

    await connect();

    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({ massage: "ID or new username not founded" }),
        {
          status: 400,
        }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ massage: "ID not founded" }), {
        status: 400,
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUsername },
      { new: true }
    );

    if (!updateUser) {
      return new NextResponse(
        JSON.stringify("user not found in the database"),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ massage: "user is updated", user: updateUser }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating user" + error.massage, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ massage: "ID not founded" }), {
        status: 400,
      });
    }

    await connect();

    const deleteUser = await User.findByIdAndDelete(new Types.ObjectId(userId));

    if (!deleteUser) {
      return new NextResponse(
        JSON.stringify({ massage: "user not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ massage: "user is deleted", user: deleteUser }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting user" + error.massage, {
      status: 500,
    });
  }
};
