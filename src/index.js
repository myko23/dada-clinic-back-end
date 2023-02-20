import express from "express";
import cors from "cors";
import morgan from "morgan";
import patientRouter from "./router/patientRouter.js";
import consultationRouter from "./router/consultationRouter.js";
import admissionRouter from "./router/admissionRouter.js";
import useRouter from "./router/userRouter.js";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/patients", patientRouter);
app.use("/consultations", consultationRouter);
app.use("/admissions", admissionRouter);
app.use("/users", useRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Listening at PORT ${port}`);
});
