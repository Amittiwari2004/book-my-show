import { WebSocketServer, WebSocket } from "ws";
import { client } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (socket: WebSocket) => {
  console.log("Client connected");

  socket.send(
    JSON.stringify({
      message: "Connected to Book My Show WebSocket server",
    })
  );

  socket.on("message", async (message) => {
    try {
      // Convert incoming message to JSON
      const data = JSON.parse(message.toString());

      const { name, email, password } = data;

      // Basic validation
      if (!name || !email || !password) {
        socket.send(
          JSON.stringify({
            success: false,
            message: "name, email and password are required",
          })
        );

        return;
      }

      // Create user in database
      const user = await client.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      console.log("User created:", user.id);

      // Send response back to WebSocket client
      socket.send(
        JSON.stringify({
          success: true,
          message: "User created successfully",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        })
      );

    } catch (error) {
      console.error("Error:", error);

      socket.send(
        JSON.stringify({
          success: false,
          message: "Something went wrong",
        })
      );
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});