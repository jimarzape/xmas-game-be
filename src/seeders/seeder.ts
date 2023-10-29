import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";
const bcrypt = require("bcrypt");

AppDataSource.initialize().then(async () => {
  console.log("checking existing data...");
  try {
    const data = await AppDataSource.createQueryBuilder()
      .select("users")
      .from(Users, "users")
      .where("users.email = :email", { email: "admin@gmail.com" })
      .getOne();
    if (data != null) {
      console.log("admin exists");
      data.name = "Admin";
      await AppDataSource.getRepository(Users).save(data);
    } else {
      console.log("no data found");
      console.log("inserting new admin");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const user = new Users();
      user.name = "admin";
      user.email = "admin@gmail.com";
      user.password = hashedPassword;
      await AppDataSource.manager.save(user);
      console.log("admin has been seeded id : " + user.id);
    }
  } catch (e) {
    console.log(e);
  }

  process.exit(1);
});
