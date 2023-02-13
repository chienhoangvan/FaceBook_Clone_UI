import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const SocketClient = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      jsonp: false,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }, [socket]);

  const sendMessage = (message) => {
    socket.emit("message", message);
  };

  return (
    <View>
      <Text>Hello, I am a React Native app using socket.io!</Text>
      <Button
        title="Send Message"
        onPress={() => sendMessage("Hello from React Native!")}
      />
    </View>
  );
};

export default SocketClient;