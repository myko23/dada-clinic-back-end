import express from "express";
import _ from "lodash";
import { DateTime } from "luxon";
const app = express.Router();

import { patientData } from "../data/patientData.js";

app.get("/", async (req, res) => {
	res.send(patientData);
});

app.post("/", async (req, res) => {
	const newID = parseInt(patientData[patientData.length - 1]?._id) + 1 || "0";
	patientData.push({ _id: newID.toString(), datecreated: DateTime.now().toFormat("MM-dd-yyyy"), ...req.body });
	res.send(patientData);
});
app.put("/:id", async (req, res) => {
	const patientID = req.params.id;

	const index = _.findIndex(patientData, (patient) => patient._id === patientID);

	patientData[index].firstname = req.body.firstname;
	patientData[index].middlename = req.body.middlename;
	patientData[index].lastname = req.body.lastname;
	patientData[index].birthday = req.body.birthday;
	patientData[index].contactno = req.body.contactno;
	patientData[index].address = req.body.address;
	patientData[index].guardian = req.body.guardian;
	patientData[index].relationship = req.body.relationship;
	patientData[index].religion = req.body.religion;
	patientData[index].past_history = req.body.past_history;
	patientData[index].current_condition = req.body.current_condition;
	patientData[index].allergies = req.body.allergies;

	res.send(patientData[index]);
});

app.delete("/:id", async (req, res) => {
	const patientID = req.params.id;

	const index = _.findIndex(patientData, (patient) => patient._id === patientID);

	patientData.splice(index, 1);

	res.send(patientData[index]);
});

export default app;
