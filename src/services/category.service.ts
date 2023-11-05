import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import { categoryCreateInt, categoryUpdateInt } from "../interfaces";

const create = async (param: categoryCreateInt) => {
  const { name } = param;
  const category = new Category();
  category.name = name;
  return await AppDataSource.getRepository(Category).save(category);
};

const update = async (param: categoryUpdateInt) => {
  const { name, id } = param;
  return await AppDataSource.getRepository(Category)
    .createQueryBuilder()
    .update()
    .set({
      name,
    })
    .where("id = :id", { id })
    .execute();
};

const softDelete = async (id: number) => {
  return await AppDataSource.getRepository(Category)
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id })
    .execute();
};

const list = async () => {
  return await AppDataSource.getRepository(Category)
    .createQueryBuilder()
    .getMany();
};

export default {
  create,
  update,
  softDelete,
  list,
};
