const { User } = require("../models");

const userData = [
  {
    username: "Cameron",
    twitter: "CameronisCool",
    github: "CameronStroup",
    email: "Cameron@gmail.com",
    password: "cam@ssword1",
  },
  {
    username: "Hunter",
    twitter: "HunterisCool",
    github: "HunterStroup",
    email: "Hunter@gmail.com",
    password: "Hunter@ssword1",
  },
  {
    username: "Lake",
    twitter: "Lakeisagoodboy",
    github: "LakeStroup",
    email: "Lake@gmail.com",
    password: "Lake@ssword1",
  },
  {
    username: "trent",
    twitter: "trent",
    github: "trent",
    email: "trent@gmail.com",
    password: "trent@ssword1",
  },
  {
    username: "Susan",
    twitter: "Susana",
    github: "SusanStropu",
    email: "susan@gmail.com",
    password: "sus@ssword1",
  },
  {
    username: "mom",
    twitter: "moma",
    github: "Momstroup",
    email: "mom@gmail.com",
    password: "mmmmm@ssword1",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
