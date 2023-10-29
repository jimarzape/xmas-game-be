import httpStatusCodes from "http-status-codes";
import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { generateCookie } from "../utilities/encryptionUtils";
import constants from "../constants";
import locale from "../constants/locale";
import { extractCookieFromRequest } from "../utilities/apiUtilities";
import { verifyCookie } from "../utilities/encryptionUtils";
import IdentiFy from "../middleware/sessionHandler";

const login: IController = async (req, res) => {
  const user = await userService.loginUser(req.body.email, req.body.password);
  if (user) {
    const cookie = await generateUserCookie(user.id);
    let newUser: any = user;
    newUser.cookie = cookie;

    apiResponse.result(res, newUser, httpStatusCodes.OK, cookie);
  } else {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      locale.INVALID_CREDENTIALS
    );
  }
};

const register: IController = async (req, res) => {
  let user;
  try {
    user = await userService.createUser(
      req.body.email,
      req.body.password,
      req.body.name,
      req
    );
  } catch (e) {
    if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.EMAIL_ALREADY_EXISTS
      );
      return;
    }
  }
  if (user) {
    const cookie = await generateUserCookie(user.id);
    apiResponse.result(res, user, httpStatusCodes.CREATED);
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  let user = await userService.getUserById(id);
  try {
    if (user) {
      await userService.updateDetails(
        id,
        req.body.email,
        req.body.name,
        req.body.password,
        req.body.password_update,
        req
      );
      let user = await userService.getUserById(id); //getting new data password not included to display
      apiResponse.result(res, user, httpStatusCodes.OK);
    } else {
      apiResponse.error(res, httpStatusCodes.NOT_FOUND);
      return;
    }
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.CONFLICT, e.message);
    return;
  }
};

const viewProfile: IController = async (req, res) => {
  const id = req.params.id;
  let user = await userService.getUserById(parseInt(id));
  try {
    if (user) {
      apiResponse.result(res, user, httpStatusCodes.OK);
    } else {
      apiResponse.error(res, httpStatusCodes.NOT_FOUND);
      return;
    }
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.CONFLICT, e.message);
    return;
  }
};

const self: IController = async (req, res) => {
  // const cookie = await generateUserCookie(req.users.id);
  // apiResponse.result(res, req.users, httpStatusCodes.OK, cookie);
  const authorizationHeader = extractCookieFromRequest(
    req,
    constants.Cookie.COOKIE_USER
  );
  const decoded = await verifyCookie(authorizationHeader);
  const user = await userService.getUserById(
    decoded.data[constants.Cookie.KEY_USER_ID]
  );
  apiResponse.result(res, user, httpStatusCodes.OK);
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.Cookie.COOKIE_USER,
    value: await generateCookie(
      constants.Cookie.KEY_USER_ID,
      userId.toString()
    ),
  };
};

const del: IController = async (req, res) => {};

export default {
  login,
  register,
  self,
  updateUser,
  viewProfile,
};
