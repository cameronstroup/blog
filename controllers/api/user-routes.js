const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbDataUser) => res.json(dbDataUser))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,

    password: req.body.password,
  }).then((dbDataUser) => {
    req.session.save(() => {
      req.session.user_id = dbDataUser.id;
      req.session.username = dbDataUser.username;
      req.session.loggedIn = true;

      res.json(dbDataUser);
    });
  });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_content", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbDataUser) => {
      if (!dbDataUser) {
        res.status(404).json({ message: "No one with this id" });
        return;
      }
      res.json(dbDataUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbDataUser) => {
    if (!dbDataUser) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbDataUser.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbDataUser.id;
      req.session.username = dbDataUser.username;

      req.session.loggedIn = true;

      res.json({ user: dbDataUser, message: "You are now logged in!" });
    });
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

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put("/:id", withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbDataUser) => {
      if (!dbDataUser[0]) {
        res.status(404).json({ message: "No one with this id" });
        return;
      }
      res.json(dbDataUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
