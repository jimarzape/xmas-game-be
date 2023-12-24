import { AppDataSource } from "../data-source";
import { People } from "../entity/People";
import {
  excludeInt,
  peopleCreateInt,
  peopleListParam,
  peopleUpdateInt,
} from "../interfaces";
import { paginateResponse } from "../utilities/paginateResponse";

const create = async (params: peopleCreateInt) => {
  const { family_id, category_id, first_name, last_name, gender, age, avatar } =
    params;
  const people = new People();
  people.family_id = family_id;
  people.category_id = category_id;
  people.first_name = first_name;
  people.last_name = last_name;
  people.gender = gender;
  people.age = age;
  people.avatar = avatar;

  await AppDataSource.manager.save(people);
  return people;
};

const update = async (params: peopleUpdateInt) => {
  const {
    id,
    family_id,
    category_id,
    first_name,
    last_name,
    gender,
    age,
    avatar,
  } = params;

  return await AppDataSource.getRepository(People)
    .createQueryBuilder()
    .update()
    .set({
      family_id,
      category_id,
      first_name,
      last_name,
      gender,
      age,
      avatar,
    })
    .where("id = :id", { id })
    .execute();
};

const softDelete = async (id: number) => {
  return await AppDataSource.getRepository(People)
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id })
    .execute();
};

const list = async (params: peopleListParam) => {
  const { take, page, query, gender, family_id, category_id } = params;
  const skip = (page - 1) * take;
  const init = AppDataSource.getRepository(People)
    .createQueryBuilder("people")
    .leftJoinAndSelect("people.family", "family")
    .leftJoinAndSelect("people.category", "category")
    .where("people.isActive = 1");

  if (gender != "") init.andWhere("people.gender = :gender", { gender });
  if (family_id != 0)
    init.andWhere("people.family_id = :family_id", { family_id });
  if (category_id != 0)
    init.andWhere("people.category_id = :category_id", { category_id });

  if (query != "")
    init.andWhere(
      `(people.first_name LIKE "${query}" OR people.last_name LIKE "${query}")`
    );

  //   init.andWhere("people.is_hbd = 1");

  const data = await init
    .take(take)
    .skip(skip)
    .orderBy("people.first_name")
    .getManyAndCount();

  return paginateResponse(data, page, take);
};

const setWon = async (id: number) => {
  return await AppDataSource.getRepository(People)
    .createQueryBuilder()
    .update()
    .set({
      isWon: true,
    })
    .where("id=:id", { id })
    .execute();
};

const clearAllWinning = async () => {
  return await AppDataSource.getRepository(People)
    .createQueryBuilder()
    .update()
    .set({
      isWon: true,
    })
    .execute();
};

const rafflelist = async (params: peopleListParam) => {
  const { take, page, query, gender, family_id, category_id, game } = params;
  const skip = (page - 1) * take;
  const init = AppDataSource.getRepository(People)
    .createQueryBuilder("people")
    .leftJoinAndSelect("people.family", "family")
    .leftJoinAndSelect("people.category", "category")
    .where("people.isActive = 1")

    .andWhere("people.exclude = 0");

  if (!game) {
    init.andWhere("people.is_won = 0");
  }

  if (gender != "") init.andWhere("people.gender = :gender", { gender });

  if (category_id != 0)
    init.andWhere("people.category_id = :category_id", { category_id });

  return await init.getMany();
};

const setExclude = async (param: excludeInt) => {
  const { id, exclude } = param;
  await AppDataSource.getRepository(People)
    .createQueryBuilder()
    .update()
    .set({
      exclude,
    })
    .where("id = :id", { id })
    .execute();
};

export default {
  create,
  update,
  list,
  softDelete,
  setWon,
  clearAllWinning,
  rafflelist,
  setExclude,
};
