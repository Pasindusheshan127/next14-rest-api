import connect from "@/lib/db";
import User from "@/lib/models/user";
import Category from "@/lib/models/category";
import Blog from "@/lib/models/blog";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { request } from "http";

export const GET = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");

    // const searchKeyword = searchParams.get("Keyword") as string;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("invalid or missing userId", {
        status: 400,
      });
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse("invalid or missing categoryId", {
        status: 400,
      });
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse("invalid or missing blogId", {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("user not found in the database", {
        status: 400,
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return new NextResponse("category not found in the database", {
        status: 400,
      });
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
      category: categoryId,
    });

    if (!blog) {
      return new NextResponse("blog not found in the database", {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify("blog is founded " + blog), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse("erroe in founding blog" + error.massage, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    const body = await request.json();
    const { title, description } = body;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse("invalid or missing blogId", {
        status: 400,
      });
    }
    if (!userId) {
      return new NextResponse("invalid or missing userId", {
        status: 400,
      });
    }
    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("user not found in the database", {
        status: 400,
      });
    }

    const blog = await Blog.findOne({
      _id: blogId,
      user: userId,
    });
    if (!blog) {
      return new NextResponse("blog not found in the database", {
        status: 400,
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        description,
      },
      {
        new: true,
      }
    );
    if (!updatedBlog) {
      return new NextResponse("Error in updating blog", {
        status: 500,
      });
    } else {
      return new NextResponse("blog is updated" + updatedBlog, {
        status: 200,
      });
    }
  } catch (error: any) {
    return new NextResponse("erroe in updating blog" + error.massage, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request, context: { params: any }) => {
  const blogId = context.params.blog;
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse("invalid or missing userId", {
        status: 400,
      });
    }

    if (!blogId || !Types.ObjectId.isValid(blogId)) {
      return new NextResponse("invalid or missing blogId", {
        status: 400,
      });
    }

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("user not found in the database", {
        status: 400,
      });
    }
    const blog = await Blog.findOne({ _id: blogId, user: userId });
    if (!blog) {
      return new NextResponse("blog not found in the database", {
        status: 400,
      });
    }

    await Blog.findByIdAndDelete(blogId);
    return new NextResponse("blog is deleted", {
      status: 200,
    });
  } catch (erroe: any) {
    return new NextResponse("erroe in deleting blog" + erroe.massage, {
      status: 500,
    });
  }
};
