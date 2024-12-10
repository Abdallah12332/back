const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    body:Object
})
const Article = mongoose.model("Article",articleSchema);
module.exports= Article;