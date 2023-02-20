import express from "express";
import _ from "lodash";
import { userData } from "../data/userData.js";
import Jwt from "jsonwebtoken";
const app = express.Router();

app.get("/", async (req, res) => {
	const User = _.pick(userData, ["id", "title", "firstname", "lastname", "imgurl", "administrator"]);

	res.send(User);
});
app.post("/login", async (req, res) => {
	const User = _.find(userData, (user) => user.username === req.body.email);

	if (!User) return res.status(400).send("Invalid User");

	if (User.password !== req.body.password) return res.status(400).send("Invalid Password");

	const jwtUser = Jwt.sign(_.omit(User, ["username", "password"]), "private-key");

	res.send(jwtUser);
});

export default app;
