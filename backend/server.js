
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

// 🔥 PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loginapp",
  password: "database", // 👈 change tdatabasehis
  port: 5432,
});


const JWT_SECRET = "mysecretkey";

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// SIGNUP
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("BODY RECEIVED:", req.body);


  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// LOGIN
//app.post("/login", async (req, res) => {
  //console.log("LOGIN BODY:", req.body);
  //const { email, password } = req.body;

//  try {
  //  const result = await pool.query(
    //  "SELECT * FROM users WHERE email=$1 AND password=$2",
      //[email, password]
    //);

    //if (result.rows.length > 0) {
    //  res.json({ message: "Login Successful" });
    //} else {
      //res.json({ message: "Invalid Credentials" });
  //}
  //} catch (err) {
    //res.json({ error: err.message });
  //}
//});
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   console.log("LOGIN BODY:", req.body);

//   try {
//     const result = await pool.query(
//       "SELECT * FROM users WHERE email=$1 AND password=$2",
//       [email, password]
//     );

//     if (result.rows.length > 0) {
//       return res.json({ message: "Login Successful" });
//     } else {
//       return res.json({ message: "Invalid Credentials" });
//     }
//   } catch (err) {
//     return res.json({ message: err.message }); // IMPORTANT FIX
//   }
// });
app.post("/login", async (req, res) => {
  console.log("LOGIN DATA:", req.body.email, req.body.password);
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ message: "Invalid Credentials" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 
    JWT_SECRET, 
    { expiresIn: "1h" });
    console.log("TOKEN GENERATED:", token);

    res.json({ message: "Login Successful", 
      token,

    });



  } catch (err) {
    res.json({ message: err.message });
  }
});
// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});