
//Packages and imports
const express = require("express");
const groceriesRouter = require("./routes/groceries");
const storeRouter = require("./routes/stores");
const authRouter = require("./routes/login")
const cookieParser = require("cookie-parser");
const session = require("express-session");
//End of packages

const app = express();
const PORT = 3000;


//Routes and middleware
app.use(cookieParser());
app.use(session(
  {
    secret:"ABDER12334121DD",
    resave: false,
    saveUninitialized: false
  }
))
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/groceries", groceriesRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/auth", authRouter);
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
