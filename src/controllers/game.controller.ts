import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { gameCreateInt } from "../interfaces";
import gameService from "../services/game.service";

const create: IController = async (req, res) => {
  try {
    const param = {
      title: req.body.title,
      link: req.body.link,
    } as gameCreateInt;
    const data = await gameService.create(param);
    apiResponse.result(res, data, httpStatusCodes.CREATED);
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
};
