const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../views');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      res.send("User already exists, please login.");
    } else {
      const data = {
        name,
        email,
        password,
      };

      await collection.insertMany([data]);
      res.send("SignUp Succesfull !! Please Login");
    }
  } catch (error) {
    res.send("Error during signup process");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email });

    if (check && check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("Wrong password or email");
    }
  } catch {
    res.send("Wrong details");
  }
});

app.listen(3000, () => {
  console.log("port connected");
});
