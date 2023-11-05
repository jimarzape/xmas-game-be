import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { categoryCreateInt, categoryUpdateInt } from "../interfaces";
import categoryService from "../services/category.service";

const create: IController = async (req, res) => {
  try {
    const param: categoryCreateInt = {
      name: req.body.name,
    };
    const data = await categoryService.create(param);
    apiResponse.result(res, data, httpStatusCodes.CREATED);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message());
  }
};

const update: IController = async (req, res) => {
  try {
    const param: categoryUpdateInt = {
      name: req.body.name,
      id: Number(req.params.id),
    };
    const data = await categoryService.update(param);
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message());
  }
};

const softDelete: IController = async (req, res) => {
  try {
    const data = await categoryService.softDelete(Number(req.params.id));
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message());
  }
};

const list: IController = async (req, res) => {
  try {
    const data = await categoryService.list();
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message());
  }
};

export default {
  create,
  update,
  softDelete,
  list,
};
