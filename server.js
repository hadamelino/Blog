import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("homepage.ejs", {posts: posts});
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {idx: posts.length});
})

app.get("/read/:id", (req, res) => {
    var idx = parseInt(req.params.id);

    res.render("read.ejs", {title: posts[idx].title, content: posts[idx].content, idx: idx});
})

app.get("/edit/:id", (req, res) => {
    var idx = parseInt(req.params.id);
    res.render("edit.ejs", {title: posts[idx].title, 
        content: posts[idx].content,
        idx: idx
    });
})

app.post("/save/:id", (req, res) => {
    var idx = parseInt(req.params.id);

    var post = {
        title: req.body["postTitle"],
        content: req.body["postContent"],
        date: generateDate()
    };

    if(idx > posts.length) {
        posts.push({
            title: req.body["postTitle"],
            content: req.body["postContent"],
            date: generateDate()
        });
    } else {
        posts[idx] = post;
    }

    res.render("homepage.ejs", {posts: posts});
});

app.post("/delete/:id", (req, res) => {
    var idx = parseInt(req.params.id);
    posts.splice(idx, 1);
    res.render("homepage.ejs", {posts: posts});
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

function generateDate() {
    const today = new Date();
    const mm = today.getMonth() + 1;
    const year = today.getFullYear();
    const dd = today.getDate();
    
    return `${dd}/${mm}/${year}`
}