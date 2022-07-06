const db = require("./database");

const testHeading = "About Nodejs"
const testContent = "As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications."

const testHeadingNew = "About Golang"
const testContentNew = "Go, also known as Golang, is an open-source, compiled, and statically typed programming language designed by Google."

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

test("create article", async () => {
  expect.assertions(1);
  const article = await db.Article.create({
    id: 1,
    heading: testHeading,
    content: testContent,
  });
  expect(article.id).toEqual(1);
});

test("get article", async () => {
  expect.assertions(2);
  const article = await db.Article.findByPk(1);
  expect(article.heading).toEqual(testHeading);
  expect(article.content).toEqual(testContent);
});


test("delete article", async () => {
  expect.assertions(1);
  await db.Article.destroy({
    where: {
      id: 1,
    },
  });
  const article = await db.Article.findByPk(1);
  expect(article).toBeNull();
});

test("update article", async () => {
  expect.assertions(3);
  let article = await db.Article.create({
    id: 2,
    heading: testHeading,
    content: testContent,
  });
  expect(article.id).toEqual(2);
  article = await db.Article.update({  heading: testHeadingNew, content: testContentNew }, 
  {
    where: {
        id: 2,
    }
  });

  expect(article.heading).toEqual(testHeadingNew);
  expect(article.content).toEqual(testContentNew);
});

afterAll(async () => {
  await db.sequelize.close();
});
