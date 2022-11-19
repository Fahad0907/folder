import express, { Application, Request, Response, Router } from "express";
import subFolder from "../schemas/subFolderSchema";
import mainFolder from "../schemas/mainFolderSchema";
const subRouter: Router = Router();

subRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newFolder = new subFolder(req.body);
    await newFolder.save();
    res.status(201).json({ error: false });
  } catch {
    res.status(500).json({ error: true });
  }
});
subRouter.get("/:id/", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const data = await subFolder.find({ parentID: id });
    res.status(200).json({
      error: false,
      result: data,
    });
  } catch {
    res.status(500).json({ error: true });
  }
});
module.exports = subRouter;

subRouter.delete("/:id/", async (req: Request, res: Response) => {
  let mainData: any;
  try {
    const data = await mainFolder.find({ _id: req.params.id });
    res.status(200).json({
      error: false,
      result: data,
    });
    console.log("found", data);
    mainData = data;
  } catch {
    res.status(500).json({ error: true });
  } finally {
    console.log(mainData);
    if (mainData.length > 0) {
      try {
        await mainFolder.findOneAndRemove({ _id: req.params.id });
      } catch {
        res.status(500).json({ error: true });
      }
    } else {
      try {
        await subFolder.findOneAndRemove({ _id: req.params.id });
      } catch {
        res.status(500).json({ error: true });
      }
    }
  }
});
