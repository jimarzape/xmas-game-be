import { AppDataSource } from "../data-source";
import { FamilyGroup } from "../entity/FamilyGroup";
import { familyCreateInt, familyUpdateInt } from "../interfaces";

const create = async (params: familyCreateInt) => {
  const { name } = params;
  const family = new FamilyGroup();
  family.name = name;
  await AppDataSource.manager.save(family);
  return family;
};

const update = async (params: familyUpdateInt) => {
  const { id, name } = params;

  await AppDataSource.getRepository(FamilyGroup)
    .createQueryBuilder()
    .update()
    .set({
      name,
    })
    .where("id = :id", { id })
    .execute();

  return await byId(id);
};

const byId = async (id: number) => {
  return await AppDataSource.getRepository(FamilyGroup)
    .createQueryBuilder()
    .where("id = :id", { id })
    .getOne();
};

const softDelete = async (id: number) => {
  return await AppDataSource.getRepository(FamilyGroup)
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id })
    .execute();
};

const list = async () => {
  return await AppDataSource.getRepository(FamilyGroup)
    .createQueryBuilder()
    .getMany();
};

export default {
  create,
  update,
  byId,
  softDelete,
  list,
};
