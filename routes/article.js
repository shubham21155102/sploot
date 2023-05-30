const express = require("express");
const router = express.Router();
const Article = require("../controllers/article");
const auth = require("../middleware/auth");
router.post("/users/:userId/articles", auth, Article.createArticle);
router.get("/articles", Article.getAllArticles);
// router.get("/article/:id", Article.getArticleById);
module.exports = router;