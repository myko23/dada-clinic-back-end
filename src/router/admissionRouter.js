import express from "express";
import _ from "lodash";
const app = express.Router();

import { recordsData } from "../data/recordsData.js";

app.get("/", async (req, res) => {
	const admissionData = _.filter(recordsData, (data) => data.type === "admission");
	res.send(admissionData);
});
app.post("/", async (req, res) => {
	const newID = parseInt(recordsData[recordsData.length - 1]?._id) + 1 || "0";
	recordsData.push({ _id: newID.toString(), type: "admission", ...req.body });

	res.send(recordsData);
});
app.put("/:id", async (req, res) => {
	const admissionID = req.params.id;

	const index = _.findIndex(recordsData, (record) => record._id === admissionID);

	recordsData[index].dateofconsult = req.body.dateofconsult;
	recordsData[index].disposition = req.body.disposition;
	recordsData[index].dateofdischarge = req.body.dateofdischarge;
	recordsData[index].chiefcomplaint = req.body.chiefcomplaint;
	recordsData[index].subjective = req.body.subjective;
	recordsData[index].objective = req.body.objective;
	recordsData[index].diagnosis = req.body.diagnosis;
	recordsData[index].labs = req.body.labs;
	recordsData[index].plan = req.body.plan;

	res.send(recordsData[index]);
});
app.put("/discharge/:id", async (req, res) => {
	const admissionID = req.params.id;

	const index = _.findIndex(recordsData, (record) => record._id === admissionID);

	recordsData[index].dateofdischarge = req.body.dateofdischarge;
	recordsData[index].disposition = req.body.disposition;

	res.send(recordsData[index]);
});
app.delete("/:id", async (req, res) => {
	const recordsID = req.params.id;

	const index = _.findIndex(recordsData, (record) => record._id === recordsID);

	recordsData.splice(index, 1);

	res.send(recordsData[index]);
});

export default app;
