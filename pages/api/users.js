import { getServerSession } from "next-auth/next";
import { initMongoose } from "../../lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import User from "../../Models/User.js";
import Follower from "../../Models/Follower";

export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    const { id, username } = req.query;
    const user = id
      ? await User.findById(id)
      : await User.findOne({ username });
    const follow = await Follower.findOne({
      source: session.user.id,
      destination: user._id,
    });
    res.json({ user, follow });
  }

  if (req.method === "PUT") {
    const { username } = req.body;
    if (session) await User.findByIdAndUpdate(session.user.id, { username });
    res.json({ username });
  }
}
