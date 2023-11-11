import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { familyCreateInt, familyUpdateInt } from "../interfaces";
import familyService from "../services/family.service";

const create: IController = async (req, res) => {
  try {
    const param = { name: req.body.name } as familyCreateInt;
    const data = await familyService.create(param);
    apiResponse.result(res, data, httpStatusCodes.CREATED);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const update: IController = async (req, res) => {
  try {
    const param = {
      name: req.body.name,
      id: Number(req.params.id),
    } as familyUpdateInt;
    const data = await familyService.update(param);
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const softDelete: IController = async (req, res) => {
  try {
    const data = await familyService.softDelete(Number(req.params.id));
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await familyService.list();
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

export default {
  create,
  update,
  softDelete,
  list,
};
