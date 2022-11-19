import express, { Application, Request, Response, Router } from "express";
import mainFolder from "../schemas/mainFolderSchema";

const router: Router = Router();

//add main folder
router.post("/", (req: Request, res: Response) => {
  const newFolder = new mainFolder({
    name: req.body.name,
    margin: 90,
  });
  newFolder.save((err: any) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(201).json({
        message: "success",
      });
    }
  });
});

//get all folder
router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await mainFolder.find({});
    res.status(200).json({
      error: false,
      result: data,
    });
  } catch {
    res.status(500).json({
      error: true,
    });
  }
});

module.exports = router;
