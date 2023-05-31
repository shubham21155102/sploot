const Article = require("../models/article");
const User=require("../models/user");
exports.createArticle = async (req, res) => {
    try {
        // const  author = req.params;
        const { userId } = req.params;
        const user = await User.findById(userId);
        console.log(user);
        const { title, description } = req.body;
        const article = new Article({
            title: title,
            description: description,
            user: userId,
            PublishedBy:user.name,
        });
               
        // console.log(author)
        console.log(article);
        await article.save();
        res.status(201).send({ message: "Article Created Successfully", success: true });
    }
    catch (error) {
        console.log(error);
        res.json({
            status: "Fail",
            error
        })
    }
};
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json({ articles });
    }
    catch (error) {
        res.json({
            status: "Fail",
            error
        })
    }
}
exports.getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        res.status(200).send({ article });
    }
    catch (error) {
        res.json({
            status: "Fail",
            error
        })
    }
}
