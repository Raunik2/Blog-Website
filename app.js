//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { truncate } = require("lodash");

const homeStartingContent = "Hi, This is the home page of my blog website. You can compose a blog by clicking on the compose buttton.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  })
})

app.get('/about', (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  })
})

app.get('/contact', (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  })
})


app.get('/compose', (req, res) => {
  res.render('compose')
})


app.post('/compose', function (req, res) {
  const post = {
    title: req.body.title,
    content:req.body.content
  }
  posts.push(post)
  res.redirect("/")
})

app.get('/posts/:topic', (req, res) => {
  let reqtitle = _.lowerCase(req.params.topic)

  posts.forEach(element => {
    if (_.lowerCase(element.title) === reqtitle) {
      res.render("post", {
        title: element.title,
        content: element.content
      });
    }
  });
  //  res.send(reqtitle);
})









app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});