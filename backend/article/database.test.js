const db = require("./database");

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

test("create article", async () => {
  expect.assertions(1);
  const article = await db.Person.create({
    id: 1,
    firstName: "Bobbie",
    lastName: "Draper",
  });
  expect(article.id).toEqual(1);
});

test("get article", async () => {
  expect.assertions(2);
  const article = await db.Person.findByPk(1);
  expect(article.firstName).toEqual("Bobbie");
  expect(article.lastName).toEqual("Draper");
});

test("delete article", async () => {
  expect.assertions(1);
  await db.Person.destroy({
    where: {
      id: 1,
    },
  });
  const article = await db.Person.findByPk(1);
  expect(article).toBeNull();
});

afterAll(async () => {
  await db.sequelize.close();
});
