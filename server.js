const express = require("express");
const mongoose = require("mongoose");
const articlesRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");

//database setup
mongoose.connect("mongodb://localhost/blog",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});

const app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use("/articles",articlesRouter);
app.get("/",async(req,res)=>{
    const articles= await Article.find().sort({createdAt:"desc"});
    res.render('articles/index',{articles:articles})
})
app.listen(5000);