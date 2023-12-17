import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import {
  peopleCreateInt,
  peopleListParam,
  peopleUpdateInt,
} from "../interfaces";
import peopleService from "../services/people.service";

const create: IController = async (req, res) => {
  try {
    const params = {
      category_id: req.body.category_id,
      family_id: req.body.family_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      age: Number(req.body.age),
      avatar: req.body.avatar,
    } as peopleCreateInt;
    const data = await peopleService.create(params);
    apiResponse.result(res, data, httpStatusCodes.CREATED);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const update: IController = async (req, res) => {
  try {
    const params = {
      id: Number(req.params.id),
      category_id: req.body.category_id,
      family_id: req.body.family_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      age: Number(req.body.age),
      avatar: req.body.avatar,
    } as peopleUpdateInt;
    const data = await peopleService.update(params);
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const softDelete: IController = async (req, res) => {
  try {
    const data = await peopleService.softDelete(Number(req.params.id));
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const list: IController = async (req, res) => {
  try {
    const param = {
      take: Number(req.body.take),
      page: Number(req.body.page),
      query: req.body.query,
      category_id: Number(req.body.category_id),
      family_id: Number(req.body.family_id),
      gender: req.body.gender,
    } as peopleListParam;
    const data = await peopleService.list(param);
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const rafflelist: IController = async (req, res) => {
  try {
    const param = {
      category_id: Number(req.body.category_id),
      family_id: Number(req.body.family_id),
      gender: req.body.gender,
    } as peopleListParam;
    const data = await peopleService.rafflelist(param);
    apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const setWon: IController = async (req, res) => {
  try {
    const data = await peopleService.setWon(Number(req.params.id));
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
  setWon,
  rafflelist,
};
