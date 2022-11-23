import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
//App Config
const app = express();
const port = process.env.PORT || 9000;
const connection_url =
	"mongodb+srv://user1:th13n2002nh4n@cluster0.z8bwhlm.mongodb.net/EXERCISE2?retryWrites=true&w=majority";
const pusher = new Pusher({
	app_id: "1512594",
	key: "41ed82443c7116bc0201",
	secret: "66d4a131d9320512d969",
	cluster: "ap1",
	useTLS: true,
});
//Middleware
app.use(express.json());
app.use(Cors());
//DB Config
mongoose.connect(connection_url);
//API Endpoints
const db = mongoose.connection;
db.once("open", () => {
	console.log("DB Connected");
	const msgCollection = db.collection("messagingmessages");
	const changeStream = msgCollection.watch();
	changeStream.on("change", (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument;
			pusher.trigger("messages", "inserted", {
				name: messageDetails.name,
				message: messageDetails.message,
				timestamp: messageDetails.timestamp,
				received: messageDetails.received,
			});
		} else {
			console.log("Error trigerring Pusher");
		}
	});
});
app.get("/", (req, res) => res.status(200).send("Hello UIT guys"));
app.post("/messages/new", (req, res) => {
	const dbMessage = req.body;
	Messages.create(dbMessage, (err, data) => {
		if (err) res.status(500).send(err);
		else res.status(201).send(data);
	});
});
app.get("/messages/sync", (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
