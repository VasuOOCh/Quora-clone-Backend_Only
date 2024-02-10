const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require('method-override')

const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req,res) => {
    res.send("Working well")
});

let posts = [
    {
        username : "apnacollege",
        content : "I love coding",
        id : uuidv4()
    },
    {
        username : "vasu",
        content : "I am an enthusiast web dev",
        id : uuidv4()
    },
    {
        username : "golu",
        content : "I'm a veteran Freefire player",
        id : uuidv4()
    }
]

app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts})
});

app.get("/posts/new", (req,res) => {
    res.render("new.ejs")
})

app.post("/posts", (req,res) => {
    // console.log(req.body);
    let newPost = {
        username : req.body.username,
        content : req.body.content,
        id : uuidv4()
    }
    posts.push(newPost);
    // console.log(newPost)

    res.redirect("/posts");
})

app.get("/posts/:id", (req,res)=> {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs", {post})
})

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    posts.find((p) => id === p.id).content = newContent;
    res.redirect("/posts");

})

app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post})
})

// app.post("/edit", (req,res) => {
//     let {content} = req.body;
//     let {id} = req.body;
//     posts.find((p) => id === p.id).content = content

//     res.redirect("/posts")
// })

app.delete("/posts/:id",(req,res) =>{ 
    let {id} = req.params;
    let ind = posts.findIndex((p) => id === p.id);
    posts.splice(ind,1);
    res.redirect("/posts")
})

app.listen(port, (req,res)=> {
    console.log("Port started")
})