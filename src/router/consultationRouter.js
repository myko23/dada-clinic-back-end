import express from "express";
import _ from "lodash";
const app = express.Router();

import { recordsData } from "../data/recordsData.js";

app.get("/", async (req, res) => {
	const consultationData = _.filter(recordsData, (data) => data.type === "consultation");
	res.send(consultationData);
});
app.post("/", async (req, res) => {
	const newID = parseInt(recordsData[recordsData.length - 1]?._id) + 1 || "0";
	recordsData.push({ _id: newID.toString(), type: "consultation", ...req.body });

	res.send(recordsData);
});
app.put("/:id", async (req, res) => {
	const consultationID = req.params.id;

	const index = _.findIndex(recordsData, (record) => record._id === consultationID);

	recordsData[index].dateofconsult = req.body.dateofconsult;
	recordsData[index].chiefcomplaint = req.body.chiefcomplaint;
	recordsData[index].subjective = req.body.subjective;
	recordsData[index].objective = req.body.objective;
	recordsData[index].labs = req.body.labs;
	recordsData[index].diagnosis = req.body.diagnosis;
	recordsData[index].plan = req.body.plan;
	recordsData[index].hmo = req.body.hmo;
	recordsData[index].bill = req.body.bill;

	res.send(recordsData[index]);
});
app.delete("/:id", async (req, res) => {
	const recordsID = req.params.id;

	const index = _.findIndex(recordsData, (patient) => patient._id === recordsID);

	recordsData.splice(index, 1);

	res.send(recordsData[index]);
});

export default app;
