import { AppDataSource } from "../data-source";
import { People } from "../entity/People";
import { peopleCreateInt, peopleUpdateInt } from "../interfaces";

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

const list = async () => {
  return await AppDataSource.getRepository(People)
    .createQueryBuilder("people")
    .leftJoinAndSelect("people.family", "family")
    .leftJoinAndSelect("people.category", "category")
    .getMany();
};

export default {
  create,
  update,
  list,
  softDelete,
};
