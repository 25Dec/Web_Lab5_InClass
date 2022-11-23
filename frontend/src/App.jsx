import React, { useState, useEffect } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Puhser from "pusher-js";
import axios from "./components/axios";
import Login from "./components/Login";
import { useStateValue } from "./components/StateProvider";

const App = () => {
	const [messages, setMessages] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		axios.get("/messages/sync").then((res) => {
			setMessages(res.data);
		});
	}, []);

	useEffect(() => {
		const pusher = new Pusher("", {
			cluster: "",
		});

		const channel = pusher.subcribe("messages");
		channel.bind("inserted", (data) => {
			setMessages([...messages, data]);
		});

		return () => {
			channel.unbind_all();
			channel.unsubcribe();
		};
	}, [messages]);

	return (
		<div className="app">
			{!user ? (
				<Login />
			) : (
				<div className="app_body">
					<Sidebar messages={messages} />
					<Chat messages={messages} />
				</div>
			)}
		</div>
	);
};

export default App;
