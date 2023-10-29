import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";
import { generateHash, verifyHash } from "../utilities/encryptionUtils";
import { sanitizeUser } from "../utilities/apiUtilities";
import IdentiFy from "../middleware/sessionHandler";
const Queue = require("bull");
require("dotenv").config();
const sharp = require("sharp");

const getUserById = async (userId: number) => {
  try {
    return await sanitizeUser(
      await AppDataSource.getRepository(Users).findOneBy({
        id: userId,
      })
    );
  } catch (e) {
    return null;
  }
};

const unSanitizedById = async (userId: number) => {
  try {
    return await AppDataSource.getRepository(Users).findOneBy({
      id: userId,
    });
  } catch (e) {
    return null;
  }
};

const createUser = async (
  email: string,
  pass: string,
  name: string = "",
  req
) => {
  const newUser = new Users();
  const user = await IdentiFy(req);
  newUser.email = email;
  newUser.password = await generateHash(pass, 10);
  newUser.name = name;
  await AppDataSource.getRepository(Users).save(newUser);
  const data = await getUserByEmail(email, true);

  return await sanitizeUser(data);
};

const updateUser = async (user: Users) => {
  return await AppDataSource.getRepository(Users).save(user);
};

const updateDetails = async (
  id: number,
  email: string,
  name: string,
  pass: string,
  password_update: boolean = false,
  req
) => {
  const user = await unSanitizedById(id);
  const currUser = await IdentiFy(req);

  let thumbnail = null;
  user.email = email;
  user.name = name;

  if (password_update) {
    const password = await generateHash(pass, Number(10));
    user.password = password;
  }
  return await updateUser(user);
};

const updatePassword = async (id, password) => {
  const user = AppDataSource.getRepository(Users);
  let newpass = await generateHash(password, 10);
  return await user.upsert([{ id: id, password: newpass }], ["id"]);
};

const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email, true);
  if (user) {
    if (await verifyHash(password, user.password)) {
      user.lastLogin = new Date().getTime().toString();
      updateUser(user); // save user login time
      return sanitizeUser(user);
    }
  }
  return null;
};

const userDd = async (id: string) => {
  let data = [];
  if (id != "" && id) {
    const user_id = id.split(",");
    data = await AppDataSource.getRepository(Users)
      .createQueryBuilder()
      .select(["id as value", "CONCAT(first_name,' ', last_name) as label"])
      .where("id IN (:...user_id)", { user_id })
      .getRawMany();
  }
  return data;
};

const userList = async () => {
  return await AppDataSource.getRepository(Users)
    .createQueryBuilder()
    .getMany();
};
const getUserByEmail = async (email: string, getHash: boolean = false) => {
  try {
    return await AppDataSource.getRepository(Users).findOneBy({
      email,
    });
  } catch (e) {
    return null;
  }
};

export default {
  createUser,
  loginUser,
  getUserById,
  updateDetails,
  updatePassword,
  getUserByEmail,
  userDd,
  userList,
};
