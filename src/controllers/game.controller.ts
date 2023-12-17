import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { gameCreateInt } from "../interfaces";
import gameService from "../services/game.service";
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
require("dotenv").config();

const create: IController = async (req, res) => {
  try {
    const param = {
      title: req.body.title,
      link: req.body.link,
      participants: Number(req.body.participants),
      teams: Number(req.body.teams),
    } as gameCreateInt;
    const data = await gameService.create(param);
    apiResponse.result(res, data, httpStatusCodes.CREATED);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const upload: IController = async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, "/uploads");
    if (!fs.existsSync(process.env.UPLOAD_PATH)) {
      fs.mkdirSync(process.env.UPLOAD_PATH);
    }
    let form = new formidable.IncomingForm();
    let newpath = process.env.UPLOAD_PATH;
    form.uploadDir = newpath;
    form.keepExtensions = true;
    form.parse(req, async (err, fields, file) => {
      //
      if (err) {
        apiResponse.error(res, httpStatusCodes.BAD_REQUEST, err.message);
        return;
      }

      const oldPath = file.file[0].filepath;
      // console.log("oldPath", oldPath);
      // console.log("file", file);
      const newPath = path.join(form.uploadDir, file.file[0].newFilename);

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        apiResponse.result(res, { path: newPath }, httpStatusCodes.CREATED);
      });
    });
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const update: IController = async (req, res) => {
  try {
    const param = {
      title: req.body.title,
      link: req.body.link,
      participants: Number(req.body.participants),
      teams: Number(req.body.teams),
    } as gameCreateInt;
    const data = await gameService.update(param, Number(req.params.id));
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const view: IController = async (req, res) => {
  try {
    const data = await gameService.byId(Number(req.params.id));
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const softDel: IController = async (req, res) => {
  try {
    const data = await gameService.softDel(Number(req.params.id));
    apiResponse.result(
      res,
      { message: "Game has been deleted" },
      httpStatusCodes.OK
    );
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await gameService.list();
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

export default {
  create,
  update,
  view,
  softDel,
  list,
  upload,
};
