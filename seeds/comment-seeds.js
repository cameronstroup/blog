const { Comment } = require("../models");

const commentData = [
  {
    user_id: 2,
    post_id: 5,
    comment_text: "This is my last project",
  },
  {
    user_id: 4,
    post_id: 4,
    comment_text: "Final week of bootcamp!",
  },
  {
    user_id: 2,
    post_id: 4,
    comment_text: "Just have to finsih this and IM done",
  },
  {
    user_id: 3,
    post_id: 5,
    comment_text: "We just reached a million subscribers! Fantastic!",
  },
  {
    user_id: 3,
    post_id: 2,
    comment_text: "Cameron keep push through!",
  },
  {
    user_id: 3,
    post_id: 4,
    comment_text: "Finish this and have a greate weeekend !",
  },
  {
    user_id: 5,
    post_id: 3,
    comment_text: "I hate handlebars, react is so much beter!",
  },
  {
    user_id: 2,
    post_id: 2,
    comment_text: "Almost done!",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
