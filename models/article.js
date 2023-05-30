const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        // unique: true 
    },
    description: {
        type: String,
        required: [true, "description is required"],
        // unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    PublishedBy: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);

// articleSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'user',
//         select: 'name email age'
//     });
//     next();
// })
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;