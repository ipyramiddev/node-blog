var express = require("express");
var router = express.Router();
var db = require("../database");

router.get("/all", function (req, res) {
  db.Article.findAll()
    .then((articles) => {
      res.status(200).send(JSON.stringify(articles));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.get("/:id", function (req, res) {
  db.Article.findByPk(req.params.id)
    .then((article) => {
      res.status(200).send(JSON.stringify(article));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.put("/", function (req, res) {
  db.Article.create({
    heading: req.body.heading,
    content: req.body.content,
  })
    .then((article) => {
      res.status(200).send(JSON.stringify(article));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.post("/:id", function (req, res) {

  const { heading, content } = req.body || {};

  if (!heading || !content) {
    res.status(400).send({ message: 'Article heading and content are required.' });
    return;
  }

  db.Article.update({  heading: heading, content: content }, 
  {
    where: {
        id: req.params.id,
    },
    returning: true,
    plain: true
  })
    .then((article) => {
      res.status(200).send(JSON.stringify(article));
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.delete("/:id", function (req, res) {
  db.Article.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send(JSON.stringify(err));
    });
});

module.exports = router;
