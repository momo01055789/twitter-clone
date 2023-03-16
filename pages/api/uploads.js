import multiparty from "multiparty";
import * as dotenv from "dotenv";
import cloudinary from "cloudinary";
import { getServerSession } from "next-auth";
import { initMongoose } from "../../lib/mongoose";
import User from "../../Models/User";
import { authOptions } from "./auth/[...nextauth]";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploads(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    const file = files.cover || files.image || files.post;
    const data = await cloudinary.uploader.upload(file[0].path);
    const photoUrl = data.url;
    if (files.cover || files.image) {
      await User.findByIdAndUpdate(session.user.id, {
        [file[0].fieldName]: photoUrl,
      });
    }
    const pureD = file[0];
    fs.unlinkSync(pureD.path);

    console.log(file[0].path);
    res.json({
      pureD,
      src: photoUrl,
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "4mb",
  },
};
