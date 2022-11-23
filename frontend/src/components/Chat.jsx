import React, { useState, useEffect } from "react";
import "./Chat.css";
import axios from "./axios";
import { useStateValue } from "./components/StateProvider";

const Chat = ({ messages }) => {
	const [seed, setSeed] = useState("");
	const [input, setInput] = useState("");
	const [{ user }, dispatch] = useStateValue();

	const sendMessage = async (e) => {
		e.preventDefault();
		await axios.post("/messages/new", {
			message: input,
			name: user.displayName,
			timestamp: new Date().toUTCString(),
			received: true,
		});
		setInput("");
	};

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	});

	return <div className="chat">Chat</div>;
};

export default Chat;
