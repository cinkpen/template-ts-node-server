import express from "express";
import MqttSender from "./mqtt/mqtt-sender";
import SqlMerl from "./sql/merl-reader";

const app = express();
const port = 3001;
const mqttServer = "mqtt://127.0.0.1";
const dbConnectionString = "server=(local);Database=merl;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

const mqtt = new MqttSender(mqttServer);

const sql = new SqlMerl(dbConnectionString);
sql.init();

app.get("/", (req, res) => {
	res.send("The sedulous hyena ate the antelope!");
});

app.get("/time/:time", (req, res) => {
	res.send(req.params);
	console.log(req.params.time);
});

app.get("/fulltime/:year/:month/:day/:hour/:min/:sec", (req, res) => {
	const dt = new Date(parseInt(req.params.year), parseInt(req.params.month), parseInt(req.params.day), parseInt(req.params.hour), parseInt(req.params.min), parseInt(req.params.sec), 0);

	console.log(req.params.time);
});

app.listen(port, () => {
	console.log(`server is listening on ${port}`);
});
