import express from "express";
import { client } from "@repo/db/client";

const app = express();

app.use(express.json());


// Health check
app.get("/", (req, res) => {
  res.send("Hello from Book My Show");
});


// Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone, avatarUrl } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Create user
    const user = await client.user.create({
      data: {
        name,
        email,
        password,
        phone,
        avatarUrl,
      },
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});


// Start server
app.listen(3001, () => {
  console.log("HTTP server running on http://localhost:3001");
});