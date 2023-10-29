import { Request } from "express";
import { Users } from "../entity/Users";

export default interface IRequest extends Request {
  users: Users;
  dashboard: boolean;
  originalUrl: "/";
  headers: {
    context: "dashboard";
  };
}
