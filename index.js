const express = require("express")
const app = express()
const port = 3000;
const path = require("path")
const { v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended : true}))
app.use(methodOverride("_method"))
let posts = [
    {
        id : uuidv4(),
        userName : "Afaq Rajpoot",
        content : "I love coding."
    },
    {
        id : uuidv4(),
        userName : "Muhammad Shahzad",
        content : "I love Programming."
    },
    {
        id : uuidv4(),
        userName : "Asad Rajpoot",
        content : "I love HardWorking."
    }
];



app.get("/posts", (req, res)=>{
    // res.send("All Posts Here")
    res.render("index.ejs", {posts})
})

app.get("/", (req, res)=>{
    res.send("Home Route")
})

// 2 Routs required for post creation :

// i)  Form Served
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs")
})
// ii)  New Post Creation :
app.post("/posts", (req, res)=>{
    console.log(req.body)
    let id = uuidv4();
    let { userName, content } = req.body;
    posts.push({id, userName, content})
    res.redirect("/posts")
})


// Show Single Post

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> (id === p.id))
    res.render("show.ejs", {post})
})


// Updation Post

app.patch("/posts/:id", (req, res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id)
    post.content = newContent;
    res.redirect("/posts")
})

// Serve Edit Form
app.get("/posts/:id/edit",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> (id === p.id))
    res.render("edit.ejs", {post})
})

// Delete Post :
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> (id !== p.id))
    res.redirect("/posts")  
    // res.send("delete success")
})
// app.use("/", (req, res)=>{
//     res.send("Home Route")

// })
app.listen(port, ()=>{
    console.log(`Listening by the server ${port}`)
})          