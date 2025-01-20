const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "products",
});

const db2 = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "product_users",
});

// users
app.post("/register", (req, res) => {
  // const id = req.body.id;
  const name = req.body.name;
  const password = req.body.password;
  console.log("Register!!!");

  // QUERY
  db2.query(
    "SELECT * FROM product_users.users WHERE name=? && password=?",
    [name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result == "") {
          console.log("No matching");

          // INSERT
          db2.query(
            "INSERT INTO product_users.users (name, password) VALUES (?,?)",
            [name, password],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Values Inserted");
              }
            }
          );
        } else {
          console.log("duplicated registeration");
          res.status(401).json({ message: "Invalid username or password" });
        }
      }
    }
  );
});

app.post("/login", (req, res) => {
    // const id = req.body.id;
    const name = req.body.name;
    const password = req.body.password;
  
    // QUERY
    db2.query(
      "SELECT * FROM product_users.users WHERE name=? && password=?",
      [name, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result == "") {
            console.log("No matching");
            res.status(401).json({ message: "Invalid username or password" });
          } else {
            console.log("successful login");
            res.send("Login Success");
          }
        }
      }
    );
  });  

// products
app.post("/create", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const rating = req.body.rating;
  const description = req.body.description;
  const image = req.body.image;

  db.query(
    "INSERT INTO products.products (id, name, rating, description, image) VALUES (?,?,?,?,?)",
    [id, name, rating, description, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products.products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      const products = result.map((product) => ({
        ...product,
        image: product.image ? product.image.toString("base64") : null,
      }));
      res.json(products);
    }
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
