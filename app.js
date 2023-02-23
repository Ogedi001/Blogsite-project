const express = require('express');
let blogs = require('./db.json');
const fs = require("fs")
 const ejs = require('ejs')
const path = require('path')

const app = express();


// app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use (express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/getblogs', (req, res) => {
    res.render('blogs', { blogs });
});

app.get('/blog', (req, res) => {
    const id = req.query.id


    let blogArry = blogs.filter((blog) => {
        return blog.id == id
    })
   
    let blog = blogArry[0]

    // let blog = null;

    // for (let i = 0; i < blogs.length; i++) {
    //     if (blogs[i].id == id) {
    //        blog = blogs[i];
    //     }
    // }


    res.render('blog', { blog });
});

app.get('/addblog', (req, res) => {
    res.render('addblog')
})

app.post('/addblog', (req, res) => {
    const payload = req.body
    blogs.push(payload)


    res.status(200).json({
        message: "Blog added sucessfully",
        
    })
    

})


app.delete('/deleteblog', (req, res) => {
    const id = Number.parseInt(req.query.id)
    blogs = blogs.filter((blog) => {
        return blog.id !== id
    })
    res.status(200).json({})
})

app.get('/updateblog',(req,res)=>{
    const id = req.query.id;
    let blog = blogs.filter(blog=> blog.id ==id)[0]
    res.render('updateblog',{blog})
})


app.patch('/updateblog',(req,res)=>{
    const { id, title, author, body, date } = req.body;
    // const id = req.body.id; same idea
console.log(blogs)
    let myBlogUpdate = function (blog) {
        if (blog.id == Number.parseInt(id)) {
            blog.title = title;
            blog.author = author;
            blog.body = body;
            blog.date = date;

            return blog;
        }
        return blog;
    }

    blogs = blogs.map(myBlogUpdate);
console.log(blogs);
    res.status(200).json({ message: "Blog updated successfuly" });
})
app.listen(3000, () => {
    console.log('App is live at http://localhost:3000')
})