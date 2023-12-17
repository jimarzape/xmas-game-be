import { AppDataSource } from "../data-source";
import { Games } from "../entity/Games";
import { gameCreateInt } from "../interfaces";

const create = async (params: gameCreateInt) => {
  const { title, link, participants, teams } = params;

  const game = new Games();
  game.title = title;
  game.link = link;
  game.participants = participants;
  game.teams = teams;

  return await AppDataSource.getRepository(Games).save(game);
};

const update = async (params: gameCreateInt, id: number) => {
  const { title, link, participants, teams } = params;
  await AppDataSource.getRepository(Games)
    .createQueryBuilder()
    .update()
    .set({
      title,
      link,
      participants,
      teams,
    })
    .where("id = :id", { id })
    .execute();

  return await byId(id);
};

const byId = async (id: number) => {
  return await AppDataSource.getRepository(Games).findOneBy({ id });
};

const softDel = async (id: number) => {
  await AppDataSource.getRepository(Games)
    .createQueryBuilder()
    .softDelete()
    .where("id = id", { id })
    .execute();
};

const list = async () => {
  return await AppDataSource.getRepository(Games)
    .createQueryBuilder()
    .orderBy("title", "ASC")
    .getMany();
};

export default { create, update, byId, softDel, list };
