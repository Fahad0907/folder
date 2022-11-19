import { Schema, model } from "mongoose";

interface IsubFolder {
  name: string;
  parentID: string;
  margin: number;
}
const folder = new Schema<IsubFolder>({
  name: { type: String, required: true },
  parentID: { type: String, required: true },
  margin: { type: Number, required: true },
});

const subFolder = model<IsubFolder>("subFolder", folder);
module.exports = subFolder;
