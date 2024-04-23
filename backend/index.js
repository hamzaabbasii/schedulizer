import express from "express";
import DbConnect from "./config/db.js";
import userRouter from "./routes/user.js";
import businessRouter from "./routes/businesses.js";
import servicesRouter from "./routes/services.js";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";

dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();
app.use(cors());

app.use(
	session({
		secret: process.env.JWT_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

DbConnect("mongodb://localhost:27017/Schedulizer");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const PORT = 8000;

app.use("/user", userRouter);
app.use("/business", businessRouter);
app.use("/services", servicesRouter);
app.use("/appointment", servicesRouter);
app.use("/uploads", express.static("uploads"));
app.listen(PORT, () => console.log(`Server started at Port:${PORT}`));
