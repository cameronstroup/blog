const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "created_at", "post_content"],
    include: [
      // include the Comment model here:
      {
        model: User,
        attributes: ["username", ],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username", ],
        },
      },
    ],
  })
    .then((dbdatapost) => {
      if (!dbdatapost) {
        res.status(404).json({ message: "id not found" });
        return;
      }
      res.json(dbdatapost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: ["id", "title", "created_at", "post_content"],
    order: [["created_at", "DESC"]],
    include: [
      // Comment model here -- attached username to comment
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username",],
      },
    ],
  })
    .then((dbdatapost) => res.json(dbdatapost))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbdatapost) => {
      if (!dbdatapost) {
        res.status(404).json({ message: "id not found" });
        return;
      }
      res.json(dbdatapost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((dbdatapost) => res.json(dbdatapost))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbdatapost) => {
      if (!dbdatapost) {
        res.status(404).json({ message: "id not found" });
        return;
      }
      res.json(dbdatapost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
