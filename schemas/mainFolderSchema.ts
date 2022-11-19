import { Schema, model } from "mongoose";

interface ImainFolder {
  name: string;
  margin: number;
}
const folder = new Schema<ImainFolder>({
  name: { type: String, required: true },
  margin: { type: Number, required: true },
});

const mainFolder = model<ImainFolder>("mainFolder", folder);
module.exports = mainFolder;
