import mongoose from "mongoose";
import { Url } from "../src/models/url.models.js";

const mongoUrl = process.env.MONGO_URL
const dbName = "BRUH"

async function fixDuplicateLinkNames() {
  try {
    await mongoose.connect(`${mongoUrl}${dbName}`)
  }
  catch (err) {
    console.log(err)
    return
  }
  const users = await Url.distinct("userId")
  for (const user of users) {

    const links = await Url.find({ userId: user }).sort({ createdAt: 1 });

    let seen = {}

    for (const link of links) {
      const name = link.linkName
      const count = seen[name] || 0

      if (count > 0) {
        link.linkName = `${name}-${count}`
        await link.save();
      }
      seen[name] = count + 1
    }
  }
  console.log("Duplicate linkNames fixed");
  await mongoose.disconnect();
  process.exit(0);
}


fixDuplicateLinkNames();
