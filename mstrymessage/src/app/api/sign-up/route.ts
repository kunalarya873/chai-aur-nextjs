import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { username, email, password } = body;
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username: username,
    });
    if (existingUserVerifiedByUsername) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        {
          status: 400,
        }
      );
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email: email,
    });
    if (existingUserVerifiedByEmail) {
        if (existingUserVerifiedByEmail.isVerified){
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        {
          status: 400,
        }
      );
    }
    else {
        const hash = await bcrypt.hash(password, 10);
        existingUserVerifiedByEmail.password = hash;
        existingUserVerifiedByEmail.verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now()+ 3600000)
        await existingUserVerifiedByEmail.save()
    }
}
    else {
    const hash = await bcrypt.hash(password, 10);
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 1)
    const newUser = new UserModel({
      username,
      email,
      password: hash,
      verifyCode: Math.floor(100000 + Math.random() * 900000).toString(),
      verifyCodeExpiry: expiryDate,
      isVerified: false,
      isAcceptingMessage: true,
      messages:[]
    });
    const savedUser = await newUser.save();
    const emailResponse = await sendVerificationEmail(
      username,
      savedUser.verifyCode,
      savedUser.email
    );
    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({ success: false, message: "Error sending email" }),
        {
          status: 500,
        }
      );
    }
    return new Response(
      JSON.stringify({ success: true, message: "User created successfully" }),
      {
        status: 201,
      }
    );
}
  } catch (error) {
    console.error("Error registering User", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error registering User" }),
      {
        status: 500,
      }
    );
  }
}
