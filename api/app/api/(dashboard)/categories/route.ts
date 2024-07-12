import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

//get category
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ massage: "invalid or missing userId" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ massage: "user not found in the database" }),
        { status: 400 }
      );
    }

    const category = await Category.find({ user: new Types.ObjectId(userId) });
    return new NextResponse(JSON.stringify(category), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.massage, { status: 500 });
  }
};

//crate catrgory
export const POST = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const { title } = await request.json();

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ massage: "invalid or missing userId" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ massage: "user not found in the database" }),
        { status: 400 }
      );
    }

    const newCategory = new Category({
      title,
      user: new Types.ObjectId(userId),
    });

    await newCategory.save();
    return new NextResponse(JSON.stringify("category created" + newCategory), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("erroe in creating category" + error.massage, {
      status: 500,
    });
  }
};
